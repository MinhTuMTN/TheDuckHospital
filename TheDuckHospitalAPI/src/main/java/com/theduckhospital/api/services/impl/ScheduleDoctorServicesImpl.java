package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.MedicalExamState;
import com.theduckhospital.api.constant.NotificationState;
import com.theduckhospital.api.constant.ScheduleSession;
import com.theduckhospital.api.constant.DateCommon;
import com.theduckhospital.api.dto.request.headdoctor.CreateDoctorScheduleRequest;
import com.theduckhospital.api.dto.request.headdoctor.UpdateDoctorScheduleRequest;
import com.theduckhospital.api.dto.response.PaginationResponse;
import com.theduckhospital.api.dto.response.doctor.*;
import com.theduckhospital.api.dto.response.admin.DoctorScheduleRoomResponse;
import com.theduckhospital.api.dto.response.nurse.QueueBookingItem;
import com.theduckhospital.api.dto.response.nurse.QueueBookingResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.*;
import com.theduckhospital.api.services.*;
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

import static com.theduckhospital.api.constant.ScheduleSession.AFTERNOON;
import static com.theduckhospital.api.constant.ScheduleSession.MORNING;

@Service
public class ScheduleDoctorServicesImpl implements IScheduleDoctorServices {
    private final IDoctorServices doctorServices;
    private final IMedicalServiceServices medicalServiceServices;
    private final IRoomServices roomServices;
    private final DoctorScheduleRepository doctorScheduleRepository;
    private final MedicalExaminationRepository examinationRepository;
    private final BookingRepository bookingRepository;
    private final ITimeSlotServices timeSlotServices;
    private final NotificationRepository notificationRepository;
    private final AccountRepository accountRepository;
    private final IFirebaseServices firebaseServices;
    @Value("${settings.date}")
    private String todayDate;

    public ScheduleDoctorServicesImpl(
            IDoctorServices doctorServices,
            IMedicalServiceServices medicalServiceServices,
            IRoomServices roomServices,
            DoctorScheduleRepository doctorScheduleRepository,
            MedicalExaminationRepository examinationRepository,
            BookingRepository bookingRepository,
            ITimeSlotServices timeSlotServices,
            NotificationRepository notificationRepository,
            AccountRepository accountRepository,
            IFirebaseServices firebaseServices
    ) {
        this.doctorServices = doctorServices;
        this.medicalServiceServices = medicalServiceServices;
        this.roomServices = roomServices;
        this.doctorScheduleRepository = doctorScheduleRepository;
        this.examinationRepository = examinationRepository;
        this.bookingRepository = bookingRepository;
        this.timeSlotServices = timeSlotServices;
        this.notificationRepository = notificationRepository;
        this.accountRepository = accountRepository;
        this.firebaseServices = firebaseServices;
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
    public DoctorSchedule getDoctorScheduleByIdForBooking(UUID doctorScheduleId) throws ParseException {
        DoctorSchedule doctorSchedule = doctorScheduleRepository.findById(doctorScheduleId)
                .orElseThrow(() -> new BadRequestException("Doctor schedule not found"));

        if (doctorSchedule.isDeleted()) {
            throw new BadRequestException("Doctor schedule not found");
        }

        if (doctorSchedule.getDate().before(DateCommon.getToday())) {
            throw new BadRequestException("Doctor schedule is not available");
        }

        return doctorSchedule;
    }

    @Override
    public DoctorSchedule getDoctorScheduleByTimeSlotId(String timeSlotId) {
        TimeSlot timeSlot = timeSlotServices.findTimeSlotByTimeSlotId(timeSlotId);

        DoctorSchedule doctorSchedule = timeSlot.getDoctorSchedule();
        if (timeSlot.isDeleted() || doctorSchedule.isDeleted()
        ) {
            throw new BadRequestException("Time slot not found");
        }

        if (doctorSchedule.getDate().before(DateCommon.getToday())) {
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

        List<DoctorSchedule> schedules = doctorScheduleRepository.findByRoomAndDateOrderByScheduleSession(room, date);

        return schedules.stream()
                .map(schedule -> new DoctorScheduleRoomResponse(
                        schedule,
                        calculateNumberOfBookings(schedule)
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<DoctorScheduleRoomResponse> getDoctorSchedulesByDoctorAndDateAdmin(UUID staffId, Date date) {
        if(date == null) {
            date =  new Date();
        }

        Doctor doctor = doctorServices.getDoctorById(staffId);

        List<DoctorSchedule> schedules = doctorScheduleRepository.findByDoctorAndDateOrderByScheduleSession(doctor, date);

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

        long maxQueueNumber = bookingRepository.countByTimeSlot_DoctorScheduleAndDeletedIsFalseAndQueueNumberGreaterThan(
                doctorSchedule,
                -1
        );
        int newQueueNumber = Math.min(doctorSchedule.getQueueNumber() + 5, (int) maxQueueNumber );
        doctorSchedule.setQueueNumber(newQueueNumber);
        doctorScheduleRepository.save(doctorSchedule);

        QueueBookingResponse response = getQueueBookingResponse(doctorSchedule);
        List<QueueBookingItem> bookings = response.getQueueBookingItems();
        for (QueueBookingItem booking : bookings) {
            Account account = accountRepository.findAccountByUserIdAndDeletedIsFalse(booking.getUserId());
            String body = "Bệnh nhân " + booking.getFullName() + " đã đến lượt khám. Vui lòng đến phòng " + booking.getRoomName() + " để khám bệnh";
            if (account != null) {
                UUID notificationId = UUID.randomUUID();
                Map<String, String> data = Map.of(
                        "title", "Đến lượt khám bệnh của bạn",
                        "body", body,
                        "action", "almostTimeForMedicalExam",
                        "value", "",
                        "notificationId", notificationId.toString(),
                        "channelId", "booking"
                );
                Notification notification = new Notification();
                notification.setNotificationId(notificationId);
                notification.setTitle("Đến lượt khám bệnh của bạn");
                notification.setContent(body);
                notification.setData(data.toString());
                notification.setAccount(account);
                notification.setCreatedAt(new Date());
                notification.setLastModifiedAt(new Date());
                notification.setDeleted(false);
                notification.setState(NotificationState.NOT_RECEIVED);
                notificationRepository.save(notification);


                firebaseServices.sendNotificationToAccount(account, data);
            }
        }

        return response;
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
                .findByDoctorAndDateAndDeletedIsFalseOrderByScheduleSessionAsc(
                        doctor,
                        today
                )
                .stream()
                .map(DoctorScheduleResponse::new)
                .toList();
    }

    @Override
    public PaginationResponse searchMedicalExaminationRecord(
            String authorization,
            UUID doctorScheduleId,
            String patientName,
            MedicalExamState state,
            int page,
            int size
    ) {
        DoctorSchedule doctorSchedule = doctorGetScheduleById(authorization, doctorScheduleId);

        Pageable pageable = PageRequest.of(page, size);
        Page<MedicalExaminationRecord> examinationRecords =
                examinationRepository
                        .findByDoctorScheduleAndDeletedIsFalseAndPatientProfile_FullNameContainingIgnoreCaseAndState(
                        doctorSchedule,
                        patientName,
                        state,
                        pageable
                );

        return PaginationResponse.builder()
                .items(examinationRecords.stream()
                        .map(SearchMedicalExamResponse::new)
                        .toList())
                .totalItems((int) examinationRecords.getTotalElements())
                .totalPages(examinationRecords.getTotalPages())
                .page(page)
                .limit(size)
                .build();
    }

    @Override
    public Map<String, String> countMedicalExaminationRecord(String authorization, UUID doctorScheduleId) {
        DoctorSchedule doctorSchedule = doctorGetScheduleById(authorization, doctorScheduleId);

        long waiting = examinationRepository.countByDoctorScheduleAndStateAndDeletedIsFalse(
                doctorSchedule,
                MedicalExamState.WAITING
        );

        long processing = examinationRepository.countByDoctorScheduleAndStateAndDeletedIsFalse(
                doctorSchedule,
                MedicalExamState.PROCESSING
        );

        return Map.of(
                "waiting", String.valueOf(waiting),
                "processing", String.valueOf(processing)
        );
    }

    @Override
    public List<DoctorScheduleItemResponse> getDoctorTimeTable(String authorization) {
        Doctor doctor = doctorServices.getDoctorByToken(authorization);

        // Get all doctor schedules 1 month from head of month
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.add(Calendar.MONTH, 2);
        Date endDate = calendar.getTime();
        calendar.add(Calendar.MONTH, -2);
        Date startDate = calendar.getTime();

        return doctorScheduleRepository
                .findByDoctorAndDateBetweenAndDeletedIsFalseOrderByDateAscScheduleSessionAsc(
                        doctor,
                        startDate,
                        endDate
                ).stream()
                .map(DoctorScheduleItemResponse::new)
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
                .findBookingsByTimeSlot_DoctorScheduleAndQueueNumberLessThanEqualAndDeletedIsFalseOrderByQueueNumberDesc(
                        doctorSchedule,
                        doctorSchedule.getQueueNumber(),
                        pageable
                );
        long maxQueueNumber = bookingRepository.countByTimeSlot_DoctorScheduleAndDeletedIsFalseAndQueueNumberGreaterThan(
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
        return bookingRepository.countByTimeSlot_DoctorScheduleAndDeletedIsFalseAndQueueNumberGreaterThan(schedule, -1);
    }

    private List<DoctorSchedule> createDoctorScheduleRange(
            MedicalService medicalService,
            Department department,
            Doctor doctor,
            Date date,
            ScheduleSession scheduleSession,
            CreateDoctorScheduleRequest request
    ) throws ParseException {
        List<DoctorSchedule> doctorSchedules = new ArrayList<>();

        // Check room is available
        Room room = roomServices.findRoomById(request.getRoomId());
        if (room.getDepartment().getDepartmentId() != department.getDepartmentId()) {
            throw new BadRequestException("Room is not in your department");
        }

        Optional<DoctorSchedule> doctorScheduleOptional = doctorScheduleRepository
                .findByRoomAndDateAndScheduleSessionAndDeletedIsFalse(
                        room,
                        date,
                        scheduleSession
                );
        if (doctorScheduleOptional.isPresent()) {
            throw new BadRequestException("Room is not available");
        }

        // Check doctor is available
        Optional<DoctorSchedule> optional = doctorScheduleRepository
                .findByDoctorAndDateAndScheduleSessionAndDeletedIsFalse(
                        doctor,
                        date,
                        scheduleSession
                );
        if (optional.isPresent()) {
            throw new BadRequestException("Doctor is not available");
        }

        Calendar time = getCalendar(date);

        DoctorSchedule doctorSchedule = new DoctorSchedule();
        doctorSchedule.setDoctorScheduleId(UUID.randomUUID());
        doctorSchedule.setDoctor(doctor);
        doctorSchedule.setRoom(room);
        doctorSchedule.setMedicalService(medicalService);
        doctorSchedule.setSlot(request.getSlotPerTimeSlot() * 4);
        doctorSchedule.setDayOfWeek(time.get(Calendar.DAY_OF_WEEK));
        doctorSchedule.setDate(date);
        doctorSchedule.setScheduleSession(scheduleSession);
        doctorSchedule.setDeleted(false);

        int startTimeSlotId = scheduleSession == MORNING ? 0 : 4;
        List<TimeSlot> timeSlots = new ArrayList<>();
        for (int i = startTimeSlotId; i < startTimeSlotId + 4; i++)
        {
            TimeSlot timeSlot = new TimeSlot(
                    doctorSchedule,
                    request.getSlotPerTimeSlot(),
                    (i % 4) * request.getSlotPerTimeSlot() + 1,
                    i
            );

            timeSlots.add(timeSlot);
        }
        doctorSchedule.setTimeSlots(timeSlots);

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
    public ScheduleRoomHeadDoctorResponse getScheduleHeadDoctor(
            String authorization,
            int roomId,
            Date date
    ){
        Doctor headDoctor = getHeadDoctor(authorization);

        Department department = headDoctor.getDepartment();

        Room room = roomServices.findRoomById(roomId);
        if (room.getDepartment().getDepartmentId() != department.getDepartmentId()) {
            throw new BadRequestException("Room is not in your department");
        }

        DoctorSchedule morningDoctorSchedule = doctorScheduleRepository
                .findDoctorScheduleByRoomAndDateAndScheduleSessionAndDeletedIsFalse(room, date, MORNING);
        ScheduleRoomItemResponse morningSchedule = new ScheduleRoomItemResponse(
                morningDoctorSchedule,
                calculateNumberOfBookings(morningDoctorSchedule)
        );

        DoctorSchedule afternoonDoctorSchedule = doctorScheduleRepository
                .findDoctorScheduleByRoomAndDateAndScheduleSessionAndDeletedIsFalse(room, date, AFTERNOON);
        ScheduleRoomItemResponse afternoonSchedule = new ScheduleRoomItemResponse(
                afternoonDoctorSchedule,
                calculateNumberOfBookings(afternoonDoctorSchedule)
        );

        return new ScheduleRoomHeadDoctorResponse(morningSchedule, afternoonSchedule);
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

    @Override
    public boolean deleteDoctorSchedule(
            String authorization,
            UUID doctorScheduleId
    ){
        getHeadDoctor(authorization);

        Optional<DoctorSchedule> optional = doctorScheduleRepository.findById(doctorScheduleId);
        if(optional.isEmpty()) {
            throw new NotFoundException("Doctor schedule not found");
        }

        DoctorSchedule doctorSchedule = optional.get();

        if(calculateNumberOfBookings(doctorSchedule) > 0) {
            throw new BadRequestException("Cant delete schedule has booking");
        }

        doctorSchedule.setDeleted(true);

        doctorScheduleRepository.save(doctorSchedule);
        return true;
    }

    @Override
    public List<Date> getDateHasSchedule(
            String authorization,
            int roomId
    ){
        Doctor headDoctor = getHeadDoctor(authorization);

        Department department = headDoctor.getDepartment();

        Room room = roomServices.findRoomById(roomId);
        if (room.getDepartment().getDepartmentId() != department.getDepartmentId()) {
            throw new BadRequestException("Room is not in your department");
        }

        List<DoctorSchedule> mergedList = getMergedScheduleRoom(room);

        return mergedList.stream()
                .map(DoctorSchedule::getDate)
                .collect(Collectors.toList());
    }

    private List<DoctorSchedule> getMergedScheduleRoom(Room room) {
        List<DoctorSchedule> morningSchedules = doctorScheduleRepository.findByRoomAndScheduleSessionAndDeletedIsFalse(
                room,
                MORNING
        );

        List<DoctorSchedule> afternoonSchedules = doctorScheduleRepository.findByRoomAndScheduleSessionAndDeletedIsFalse(
                room,
                AFTERNOON
        );

        return Stream.concat(morningSchedules.stream(), afternoonSchedules.stream())
                .distinct()
                .toList();
    }
    @Override
    public List<Date> getDateHasDoctorSchedule(UUID staffId){
        Doctor doctor = doctorServices.getDoctorById(staffId);

        List<DoctorSchedule> morningSchedules = doctorScheduleRepository.findByDoctorAndScheduleSessionAndDeletedIsFalse(
                doctor,
                MORNING
        );

        List<DoctorSchedule> afternoonSchedules = doctorScheduleRepository.findByDoctorAndScheduleSessionAndDeletedIsFalse(
                doctor,
                AFTERNOON
        );

        List<DoctorSchedule> mergedList = Stream.concat(morningSchedules.stream(), afternoonSchedules.stream())
                .distinct()
                .toList();

        return mergedList.stream()
                .map(DoctorSchedule::getDate)
                .collect(Collectors.toList());
    }

    @Override
    public List<Date> getDateHasDoctorScheduleRoom(int roomId){
        Room room = roomServices.findRoomById(roomId);


        List<DoctorSchedule> mergedList = getMergedScheduleRoom(room);

        return mergedList.stream()
                .map(DoctorSchedule::getDate)
                .collect(Collectors.toList());
    }

    private List<Date> getInvalidDate(
            Room room,
            Doctor doctor,
            ScheduleSession scheduleSession
            ) {
        List<DoctorSchedule> doctorSchedules1 = doctorScheduleRepository
                .findByDoctorAndScheduleSessionAndDeletedIsFalse(
                doctor,
                scheduleSession
        );

        List<DoctorSchedule> doctorSchedules2 = doctorScheduleRepository
                .findByRoomAndScheduleSessionAndDeletedIsFalse(
                room,
                scheduleSession
        );

        List<DoctorSchedule> mergedList = Stream.concat(doctorSchedules1.stream(), doctorSchedules2.stream())
                .distinct()
                .toList();

        return mergedList.stream()
                .map(DoctorSchedule::getDate)
                .collect(Collectors.toList());
    }

    private DoctorSchedule doctorGetScheduleById(String authorization, UUID doctorScheduleId) {
        Doctor doctor = doctorServices.getDoctorByToken(authorization);
        DoctorSchedule doctorSchedule = doctorScheduleRepository
                .findById(doctorScheduleId)
                .orElseThrow(() -> new BadRequestException("Doctor schedule not found"));

        if (doctorSchedule.isDeleted()) {
            throw new BadRequestException("Doctor schedule not found");
        }

        if (doctorSchedule.getDoctor().getStaffId() != doctor.getStaffId()) {
            throw new BadRequestException("Doctor schedule is not yours");
        }

        return doctorSchedule;
    }

    @Override
    public List<Doctor> getActiveDoctorsInDepartment(String authorization) {
        Doctor headDoctor = getHeadDoctor(authorization);

        Department department = headDoctor.getDepartment();

        List<Doctor> doctors = department.getDoctors();
        doctors.removeIf(Staff::isDeleted);

        return doctors;
    }

    @Override
    public DoctorSchedule updateDoctorSchedule(
            String authorization,
            UUID doctorScheduleId,
            UpdateDoctorScheduleRequest request
    ) {
        Calendar today = Calendar.getInstance();
        Calendar date = Calendar.getInstance();
        today.set(Calendar.HOUR_OF_DAY, 0);
        date.setTime(request.getDate());

        boolean sameDay = today.get(Calendar.DAY_OF_YEAR) == date.get(Calendar.DAY_OF_YEAR) &&
                today.get(Calendar.YEAR) == date.get(Calendar.YEAR);

        if (sameDay || date.before(today)) {
            throw new BadRequestException("Not today or the previous days");
        }

        Doctor headDoctor = getHeadDoctor(authorization);

        Department department = headDoctor.getDepartment();
        Doctor doctor = doctorServices.getDoctorById(request.getStaffId());
        if (doctor.getDepartment().getDepartmentId() != (department.getDepartmentId())) {
            throw new BadRequestException("Doctor is not in your department");
        }

        Optional<DoctorSchedule> scheduleOptional = doctorScheduleRepository.findById(doctorScheduleId);
        if(scheduleOptional.isEmpty()) {
            throw new NotFoundException("Doctor schedule not found");
        }

        DoctorSchedule doctorSchedule = scheduleOptional.get();

        if (request.getSlot() == 0 || request.getSlot() < calculateNumberOfBookings(doctorSchedule)){
            throw new BadRequestException("Invalid Slot");
        }

        doctorSchedule.setDoctor(doctor);
        doctorSchedule.setSlot(request.getSlot());
        return doctorScheduleRepository.save(doctorSchedule);
    }
}
