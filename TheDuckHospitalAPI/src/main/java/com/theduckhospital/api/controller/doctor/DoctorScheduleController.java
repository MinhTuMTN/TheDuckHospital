package com.theduckhospital.api.controller.doctor;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IScheduleDoctorServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/api/doctor/doctor-schedules")
@PreAuthorize("hasAnyRole('ROLE_DOCTOR', 'ROLE_HEAD_DOCTOR')")
public class DoctorScheduleController {
    private final IScheduleDoctorServices scheduleDoctorServices;

    public DoctorScheduleController(IScheduleDoctorServices scheduleDoctorServices) {
        this.scheduleDoctorServices = scheduleDoctorServices;
    }

    @GetMapping
    public ResponseEntity<?> getTodayDoctorSchedules(
            @RequestHeader("Authorization") String authorization
    ) throws ParseException {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(scheduleDoctorServices.getTodayDoctorSchedules(authorization))
                        .build()
        );
    }
}
