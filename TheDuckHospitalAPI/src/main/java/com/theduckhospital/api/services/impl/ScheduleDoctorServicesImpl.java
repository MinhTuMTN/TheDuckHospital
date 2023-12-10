package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.dto.request.headdoctor.CreateDoctorScheduleRequest;
import com.theduckhospital.api.dto.request.headdoctor.DoctorScheduleItemRequest;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.repository.DoctorScheduleRepository;
import com.theduckhospital.api.services.IDoctorServices;
import com.theduckhospital.api.services.IMedicalServiceServices;
import com.theduckhospital.api.services.IRoomServices;
import com.theduckhospital.api.services.IScheduleDoctorServices;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ScheduleDoctorServicesImpl implements IScheduleDoctorServices {
    private final IDoctorServices doctorServices;
    private final IMedicalServiceServices medicalServiceServices;
    private final IRoomServices roomServices;
    private final DoctorScheduleRepository doctorScheduleRepository;

    public ScheduleDoctorServicesImpl(
            IDoctorServices doctorServices,
            IMedicalServiceServices medicalServiceServices,
            IRoomServices roomServices, DoctorScheduleRepository doctorScheduleRepository) {
        this.doctorServices = doctorServices;
        this.medicalServiceServices = medicalServiceServices;
        this.roomServices = roomServices;
        this.doctorScheduleRepository = doctorScheduleRepository;
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

        Calendar startTime = getCalendar(request.getStartTime());
        Calendar endTime = getCalendar(request.getEndTime());
        if (!checkDateIsValid(startTime, endTime)) {
            throw new BadRequestException("Start time or end time is invalid");
        }

        List<DoctorSchedule> doctorSchedules = new ArrayList<>();
        for (DoctorScheduleItemRequest scheduleItemRequest : request.getScheduleItems()) {
            Calendar startTime1 = getCalendar(request.getStartTime());
            Calendar endTime1 = getCalendar(request.getEndTime());
            List<DoctorSchedule> doctorScheduleRange = createDoctorScheduleRange(
                    startTime1,
                    endTime1,
                    medicalService,
                    department,
                    doctor,
                    scheduleItemRequest
            );

            doctorSchedules.addAll(doctorScheduleRange);
        }

        return doctorScheduleRepository.saveAll(doctorSchedules);
    }

    private List<DoctorSchedule> createDoctorScheduleRange(
            Calendar startTime,
            Calendar endTime,
            MedicalService medicalService,
            Department department,
            Doctor doctor,
            DoctorScheduleItemRequest scheduleItemRequest
    ) {
        List<DoctorSchedule> doctorSchedules = new ArrayList<>();

        // Check room is available
        Room room = roomServices.findRoomById(scheduleItemRequest.getRoomId());
        if (room.getDepartment().getDepartmentId() != department.getDepartmentId()) {
            throw new BadRequestException("Room is not in your department");
        }

        for (; startTime.before(endTime); startTime.add(Calendar.DATE, 1)) {
            if (startTime.get(Calendar.DAY_OF_WEEK) - scheduleItemRequest.getDayOfWeek() != 0) {
                continue;
            }

            Optional<DoctorSchedule> doctorScheduleOptional = doctorScheduleRepository
                    .findByRoomAndDateAndScheduleTypeAndDeletedIsFalse(
                            room,
                            startTime.getTime(),
                            scheduleItemRequest.getScheduleType()
                    );
            if (doctorScheduleOptional.isPresent()) {
                throw new BadRequestException("Room is not available");
            }

            // Check doctor is available
            Optional<DoctorSchedule> optional = doctorScheduleRepository
                    .findByDoctorAndDateAndScheduleTypeAndDeletedIsFalse(
                            doctor,
                            startTime.getTime(),
                            scheduleItemRequest.getScheduleType()
                    );
            if (optional.isPresent()) {
                throw new BadRequestException("Doctor is not available");
            }

            DoctorSchedule doctorSchedule = new DoctorSchedule();
            doctorSchedule.setDoctor(doctor);
            doctorSchedule.setRoom(room);
            doctorSchedule.setMedicalService(medicalService);
            doctorSchedule.setSlot(scheduleItemRequest.getSlot());
            doctorSchedule.setDayOfWeek(scheduleItemRequest.getDayOfWeek());
            doctorSchedule.setDate(startTime.getTime());
            doctorSchedule.setScheduleType(scheduleItemRequest.getScheduleType());
            doctorSchedule.setDeleted(false);

            doctorSchedules.add(doctorSchedule);
        }

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
}
