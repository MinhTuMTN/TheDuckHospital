package com.theduckhospital.api.controller.doctor;

import com.theduckhospital.api.constant.MedicalExamState;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IScheduleDoctorServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.UUID;

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

    @GetMapping("/time-table")
    public ResponseEntity<?> getDoctorTimeTable(
            @RequestHeader("Authorization") String authorization
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(scheduleDoctorServices.getDoctorTimeTable(authorization))
                        .build()
        );
    }

    @GetMapping("/{doctorScheduleId}/medical-records")
    public ResponseEntity<?> searchMedicalExaminationRecord(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("doctorScheduleId") UUID doctorScheduleId,
            @RequestParam(value = "patientName", defaultValue = "") String patientName,
            @RequestParam(value = "state") MedicalExamState state,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "5") int size
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(scheduleDoctorServices
                                .searchMedicalExaminationRecord(
                                        authorization,
                                        doctorScheduleId,
                                        patientName,
                                        state,
                                        page,
                                        size
                                )
                        )
                        .build()
        );
    }

    @GetMapping("/{doctorScheduleId}/medical-records/count")
    public ResponseEntity<?> countMedicalExaminationRecord(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("doctorScheduleId") UUID doctorScheduleId
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(scheduleDoctorServices
                                .countMedicalExaminationRecord(
                                        authorization,
                                        doctorScheduleId
                                )
                        )
                        .build()
        );
    }
}
