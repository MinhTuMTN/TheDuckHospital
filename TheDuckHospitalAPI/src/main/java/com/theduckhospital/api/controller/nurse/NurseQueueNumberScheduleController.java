package com.theduckhospital.api.controller.nurse;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IScheduleDoctorServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.UUID;

@RestController
@RequestMapping("/api/nurse/queue-number-schedules")
@PreAuthorize("hasRole('ROLE_NURSE')")
public class NurseQueueNumberScheduleController {
    private final IScheduleDoctorServices scheduleDoctorServices;


    public NurseQueueNumberScheduleController(IScheduleDoctorServices scheduleDoctorServices) {
        this.scheduleDoctorServices = scheduleDoctorServices;
    }

    @PostMapping("/{doctorScheduleId}")
    public ResponseEntity<?> increaseQueueNumber(
            @PathVariable("doctorScheduleId") UUID doctorScheduleId
    ) throws ParseException {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Increase queue number successfully")
                        .data(scheduleDoctorServices.increaseQueueNumber(doctorScheduleId))
                        .build()
        );
    }

    @GetMapping("/{doctorScheduleId}")
    public ResponseEntity<?> getQueueNumber(
            @PathVariable("doctorScheduleId") UUID doctorScheduleId
    ) throws ParseException {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get queue number successfully")
                        .data(scheduleDoctorServices.getQueueNumber(doctorScheduleId))
                        .build()
        );
    }
}
