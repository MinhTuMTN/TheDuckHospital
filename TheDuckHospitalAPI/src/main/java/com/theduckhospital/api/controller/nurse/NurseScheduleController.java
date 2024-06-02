package com.theduckhospital.api.controller.nurse;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.INurseServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/api/nurse/schedules")
@PreAuthorize("hasRole('NURSE') || hasRole('HEAD_NURSE')")
public class NurseScheduleController {
    private final INurseServices nurseServices;

    public NurseScheduleController(INurseServices nurseServices) {
        this.nurseServices = nurseServices;
    }

    @GetMapping
    public ResponseEntity<?> getNurseSchedules(
            @RequestHeader("Authorization") String authorization,
            @RequestParam(value = "month", required = false) Integer month,
            @RequestParam(value = "year", required = false) Integer year
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .statusCode(200)
                        .data(nurseServices.getNurseSchedules(
                                authorization,
                                month,
                                year
                        ))
                        .build()
        );
    }

    @GetMapping("/today-examination-schedules")
    public ResponseEntity<?> getTodayDoctorSchedules(
            @RequestHeader(value = "Authorization") String token
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(nurseServices.getTodayExaminationSchedules(token))
                        .build()
        );
    }
}
