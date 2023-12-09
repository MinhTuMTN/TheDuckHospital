package com.theduckhospital.api.controller.headdoctor;

import com.theduckhospital.api.dto.request.headdoctor.CreateDoctorScheduleRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IScheduleDoctorServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/head-doctor/schedules")
@PreAuthorize("hasRole('ROLE_HEAD_DOCTOR')")
public class ScheduleHeadDoctorController {
    private final IScheduleDoctorServices scheduleDoctorServices;

    public ScheduleHeadDoctorController(IScheduleDoctorServices scheduleDoctorServices) {
        this.scheduleDoctorServices = scheduleDoctorServices;
    }

    @PostMapping
    public ResponseEntity<?> createDoctorSchedule(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody CreateDoctorScheduleRequest request
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Create doctor schedule successfully")
                        .data(scheduleDoctorServices
                                .createDoctorSchedule(authorizationHeader, request)
                        )
                        .build()
        );
    }
}
