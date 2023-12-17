package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.ScheduleType;
import com.theduckhospital.api.constant.DateCommon;
import com.theduckhospital.api.dto.request.headdoctor.CreateDoctorScheduleRequest;
import com.theduckhospital.api.dto.response.admin.InvalidDateResponse;
import com.theduckhospital.api.dto.response.admin.DoctorScheduleRoomResponse;
import com.theduckhospital.api.dto.response.doctor.DoctorScheduleResponse;
import com.theduckhospital.api.dto.response.nurse.QueueBookingResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.repository.BookingRepository;
import com.theduckhospital.api.repository.DoctorScheduleRepository;
import com.theduckhospital.api.services.IDoctorServices;
import com.theduckhospital.api.services.IMedicalServiceServices;
import com.theduckhospital.api.services.IRoomServices;
import com.theduckhospital.api.services.IScheduleDoctorServices;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.theduckhospital.api.constant.ScheduleType.AFTERNOON;
import static com.theduckhospital.api.constant.ScheduleType.MORNING;

@Service
public class ScheduleDoctorServicesImpl implements IScheduleDoctorServices {
    private final IDoctorServices doctorServices;
    private final IMedicalServiceServices medicalServiceServices;
    private final IRoomServices roomServices;
    private final DoctorScheduleRepository doctorScheduleRepository;
    private final BookingRepository bookingRepository;
    @Value("${settings.date}")
    private String todayDate;

    public ScheduleDoctorServicesImpl(
            IDoctorServices doctorServices,
            IMedicalServiceServices medicalServiceServices,
            IRoomServices roomServices,
            DoctorScheduleRepository doctorScheduleRepository,
            BookingRepository bookingRepository) {
        this.doctorServices = doctorServices;
        this.medicalServiceServices = medicalServiceServices;
        this.roomServices = roomServices;
        this.doctorScheduleRepository = doctorScheduleRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public List<DoctorSchedule> createDoctorSchedule(
            String authorization,
            CreateDoctorScheduleRequest request
    ) throws ParseException {
        Doctor headDoctor = getHeadDoctor(authorization);

        Department department = headDoctor.getDepartment();
        Doctor doctor = doctorServices.getDoctorById(request.getDoctorId());
        if (doctor.getDepartment().getDepartmentId() != (department.getDepartmentId())) {
            throw new BadRequestException("Doctor is not in your department");
        }

        MedicalService medicalService =
                medicalServiceServices.getMedicalServiceById(request.getMedicalServiceId());
        if (medicalService.getDepartment().getDepartmentId() != (department.getDepartmentId())) {
            throw new BadRequestException("Medical service is not in your department");
        }

        List<DoctorSchedule> doctorSchedules = new ArrayList<>();
        for (Date date : request.getMorningDates()) {
            List<DoctorSchedule> doctorScheduleRange = createDoctorScheduleRange(
                    medicalService,
                    department,
                    doctor,
                    date,
                    MORNING,
                    request
            );

            doctorSchedules.addAll(doctorScheduleRange);
        }
        for (Date date : request.getAfternoonDates()) {
            List<DoctorSchedule> doctorScheduleRange = createDoctorScheduleRange(
                    medicalService,
                    department,
                    doctor,
                    date,
                    AFTERNOON,
                    request
            );

            doctorSchedules.addAll(doctorScheduleRange);
        }

        return doctorScheduleRepository.saveAll(doctorSchedules);
    }

    @Override
    public DoctorSchedule getDoctorScheduleByIdForBooking(UUID doctorScheduleId) {
        DoctorSchedule doctorSchedule = doctorScheduleRepository.findById(doctorScheduleId)
                .orElseThrow(() -> new BadRequestException("Doctor schedule not found"));

        if (doctorSchedule.isDeleted()) {
            throw new BadRequestException("Doctor schedule not found");
        }

        if (doctorSchedule.getDate().before(new Date())) {
            throw new BadRequestException("Doctor schedule is not available");
        }

        return doctorSchedule;
    }

    @Override
    public List<DoctorScheduleRoomResponse> getDoctorSchedulesByRoomAndDateAdmin(int roomId, Date date) {
        if(date == null) {
            date =  new Date();
        }

        Room room = roomServices.findRoomById(roomId);

        List<DoctorSchedule> schedules = doctorScheduleRepository.findByRoomAndDateOrderByScheduleType(room, date);

        return schedules.stream()
                .map(schedule -> new DoctorScheduleRoomResponse(
                        schedule,
                        calculateNumberOfBookings(schedule)
                ))
                .collect(Collectors.toList());
    }

    @Override
    public QueueBookingResponse increaseQueueNumber(UUID doctorScheduleId) throws ParseException {
        DoctorSchedule doctorSchedule = getDoctorScheduleById(doctorScheduleId);

        long maxQueueNumber = bookingRepository.countByDoctorScheduleAndDeletedIsFalseAndQueueNumberGreaterThan(
                doctorSchedule,
                -1
        );
        int newQueueNumber = Math.min(doctorSchedule.getQueueNumber() + 5, (int) maxQueueNumber );
        doctorSchedule.setQueueNumber(newQueueNumber);
        doctorScheduleRepository.save(doctorSchedule);

        return getQueueBookingResponse(doctorSchedule);
    }

    @Override
    public QueueBookingResponse getQueueNumber(UUID doctorScheduleId) throws ParseException {
        DoctorSchedule doctorSchedule = getDoctorScheduleById(doctorScheduleId);

        return getQueueBookingResponse(doctorSchedule);
    }

    @Override
    public List<DoctorScheduleRoomResponse> getDoctorSchedulesByDepartmentId(Integer departmentId) throws ParseException {
        Date today = DateCommon.getToday();

        List<DoctorSchedule> schedules = doctorScheduleRepository
                .findByMedicalService_Department_DepartmentIdAndDateAndDeletedIsFalse(
                        departmentId,
                        today
                );

        return schedules.stream()
                .map(schedule -> new DoctorScheduleRoomResponse(schedule, calculateNumberOfBookings(schedule)))
                .collect(Collectors.toList());
    }

    @Override
    public List<DoctorScheduleResponse> getTodayDoctorSchedules(String authorization) throws ParseException {
        Doctor doctor = doctorServices.getDoctorByToken(authorization);
        Date today = DateCommon.getToday();
        return doctorScheduleRepository
                .findByDoctorAndDateAndDeletedIsFalse(
                        doctor,
                        today
                )
                .stream()
                .map(DoctorScheduleResponse::new)
                .toList();
    }

    private DoctorSchedule getDoctorScheduleById(UUID doctorScheduleId) throws ParseException {
        DoctorSchedule doctorSchedule = doctorScheduleRepository.findById(doctorScheduleId)
                .orElseThrow(() -> new BadRequestException("Doctor schedule not found"));

        if (doctorSchedule.isDeleted()) {
            throw new BadRequestException("Doctor schedule not found");
        }

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date date = formatter.parse(todayDate);
        if (doctorSchedule.getDate().before(date)) {
            throw new BadRequestException("Doctor schedule is not available");
        }

        return doctorSchedule;
    }

    private QueueBookingResponse getQueueBookingResponse(DoctorSchedule doctorSchedule) {
        int limit = 5;
        if (doctorSchedule.getQueueNumber() % 5 != 0) {
            limit = doctorSchedule.getQueueNumber() % 5;
        }

        Pageable pageable = PageRequest.of(0, limit);
        Page<Booking> bookings = bookingRepository
                .findBookingsByDoctorScheduleAndQueueNumberLessThanEqualAndDeletedIsFalseOrderByQueueNumberDesc(
                        doctorSchedule,
                        doctorSchedule.getQueueNumber(),
                        pageable
                );
        long maxQueueNumber = bookingRepository.countByDoctorScheduleAndDeletedIsFalseAndQueueNumberGreaterThan(
                doctorSchedule,
                -1
        );

        return new QueueBookingResponse(
                doctorSchedule,
                maxQueueNumber,
                bookings.getContent().stream()
                        .sorted(Comparator.comparingInt(Booking::getQueueNumber))
                        .toList()
        );
    }
    public long calculateNumberOfBookings(DoctorSchedule schedule) {
        return bookingRepository.countByDoctorScheduleAndDeletedIsFalseAndQueueNumberGreaterThan(schedule, -1);
    }

    private List<DoctorSchedule> createDoctorScheduleRange(
            MedicalService medicalService,
            Department department,
            Doctor doctor,
            Date date,
            ScheduleType scheduleType,
            CreateDoctorScheduleRequest request
    ) throws ParseException {
        List<DoctorSchedule> doctorSchedules = new ArrayList<>();

        // Check room is available
        Room room = roomServices.findRoomById(request.getRoomId());
        if (room.getDepartment().getDepartmentId() != department.getDepartmentId()) {
            throw new BadRequestException("Room is not in your department");
        }

            Optional<DoctorSchedule> doctorScheduleOptional = doctorScheduleRepository
                    .findByRoomAndDateAndScheduleTypeAndDeletedIsFalse(
                            room,
                            date,
                            scheduleType
                    );
            if (doctorScheduleOptional.isPresent()) {
                throw new BadRequestException("Room is not available");
            }

            // Check doctor is available
            Optional<DoctorSchedule> optional = doctorScheduleRepository
                    .findByDoctorAndDateAndScheduleTypeAndDeletedIsFalse(
                            doctor,
                            date,
                            scheduleType
                    );
            if (optional.isPresent()) {
                throw new BadRequestException("Doctor is not available");
            }

            Calendar time = getCalendar(date);

            DoctorSchedule doctorSchedule = new DoctorSchedule();
            doctorSchedule.setDoctor(doctor);
            doctorSchedule.setRoom(room);
            doctorSchedule.setMedicalService(medicalService);
            doctorSchedule.setSlot(request.getSlot());
            doctorSchedule.setDayOfWeek(time.get(Calendar.DAY_OF_WEEK));
            doctorSchedule.setDate(date);
            doctorSchedule.setScheduleType(scheduleType);
            doctorSchedule.setDeleted(false);

            doctorSchedules.add(doctorSchedule);

        return doctorSchedules;
    }

    private boolean checkDateIsValid (Calendar startTime, Calendar endTime) {
        Calendar now = Calendar.getInstance();
        if (startTime.before(now)) {
            return false;
        }

        return !startTime.after(endTime);
    }

    private Calendar getCalendar(Date date) throws ParseException {
        DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date dateWithoutTime = formatter.parse(formatter.format(date));
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(dateWithoutTime);
        return calendar;
    }

    private Doctor getHeadDoctor(String authorization) {
        Doctor doctor = doctorServices.getDoctorByToken(authorization);
        if (!doctor.isHeadOfDepartment()) {
            throw new RuntimeException("You are not head of department");
        }

        return doctor;
    }

    @Override
    public InvalidDateResponse getInvalidDateSchedule(
            String authorization,
            int roomId,
            UUID doctorId
    ){
        Doctor headDoctor = getHeadDoctor(authorization);

        Department department = headDoctor.getDepartment();
        Doctor doctor = doctorServices.getDoctorById(doctorId);
        if (doctor.getDepartment().getDepartmentId() != (department.getDepartmentId())) {
            throw new BadRequestException("Doctor is not in your department");
        }

        Room room = roomServices.findRoomById(roomId);
        if (room.getDepartment().getDepartmentId() != department.getDepartmentId()) {
            throw new BadRequestException("Room is not in your department");
        }

        List<Date> morningSchedule = getInvalidDate(room, doctor, MORNING);
        List<Date> afternoonSchedule = getInvalidDate(room, doctor, AFTERNOON);

        return new InvalidDateResponse(morningSchedule, afternoonSchedule);
    }

    private List<Date> getInvalidDate(
            Room room,
            Doctor doctor,
            ScheduleType scheduleType
            ) {
        List<DoctorSchedule> doctorSchedules1 = doctorScheduleRepository.findByDoctorAndScheduleTypeAndDeletedIsFalse(
                doctor,
                scheduleType
        );

        List<DoctorSchedule> doctorSchedules2 = doctorScheduleRepository.findByRoomAndScheduleTypeAndDeletedIsFalse(
                room,
                scheduleType
        );

        List<DoctorSchedule> mergedList = Stream.concat(doctorSchedules1.stream(), doctorSchedules2.stream())
                .distinct()
                .toList();

        return mergedList.stream()
                .map(DoctorSchedule::getDate)
                .collect(Collectors.toList());
    }
}
