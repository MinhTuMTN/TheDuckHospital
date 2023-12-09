package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.dto.request.headdoctor.CreateDoctorScheduleRequest;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.repository.DoctorScheduleRepository;
import com.theduckhospital.api.services.IDoctorServices;
import com.theduckhospital.api.services.IMedicalServiceServices;
import com.theduckhospital.api.services.IRoomServices;
import com.theduckhospital.api.services.IScheduleDoctorServices;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
    public DoctorSchedule createDoctorSchedule(
            String authorization,
            CreateDoctorScheduleRequest request
    ) {
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

        Room room = roomServices.findRoomById(request.getRoomId());
        if (room.getDepartment().getDepartmentId() != (department.getDepartmentId())) {
            throw new BadRequestException("Room is not in your department");
        }

        // Check room is available for this schedule
        Optional<DoctorSchedule> optional = doctorScheduleRepository
                .findDoctorScheduleByRoomAndScheduleTypeAndDayOfWeekAndDeletedIsFalse(
                        room,
                        request.getScheduleType(),
                        request.getDayOfWeek()
                );

        if (optional.isPresent()) {
            throw new BadRequestException("Doctor schedule already exists");
        }

        // Check doctor is available for this schedule
        if (doctor.getDoctorSchedules().stream().anyMatch(doctorSchedule ->
                doctorSchedule.getDayOfWeek() == request.getDayOfWeek()
                        && doctorSchedule.getScheduleType() == request.getScheduleType()
                        && !doctorSchedule.isDeleted()
        )) {
            throw new BadRequestException("Doctor is not available for this schedule");
        }

        // Create doctor schedule
        DoctorSchedule doctorSchedule = new DoctorSchedule();
        doctorSchedule.setDoctor(doctor);
        doctorSchedule.setMedicalService(medicalService);
        doctorSchedule.setRoom(room);
        doctorSchedule.setSlot(request.getSlot());
        doctorSchedule.setDayOfWeek(request.getDayOfWeek());
        doctorSchedule.setScheduleType(request.getScheduleType());
        doctorSchedule.setDeleted(false);

        return doctorScheduleRepository.save(doctorSchedule);
    }

    private Doctor getHeadDoctor(String authorization) {
        Doctor doctor = doctorServices.getDoctorByToken(authorization);
        if (!doctor.isHeadOfDepartment()) {
            throw new RuntimeException("You are not head of department");
        }

        return doctor;
    }
}
