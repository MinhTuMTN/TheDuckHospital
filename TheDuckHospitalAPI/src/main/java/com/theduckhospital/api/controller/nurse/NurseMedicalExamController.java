package com.theduckhospital.api.controller.nurse;

import com.theduckhospital.api.dto.request.nurse.NonPatientMedicalExamRequest;
import com.theduckhospital.api.dto.request.nurse.PatientMedicalExamRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IMedicalExamServices;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/nurse/medical-exams")
@PreAuthorize("hasRole('ROLE_NURSE')")
public class NurseMedicalExamController {
    private final IMedicalExamServices medicalExamServices;

    public NurseMedicalExamController(IMedicalExamServices medicalExamServices) {
        this.medicalExamServices = medicalExamServices;
    }

    @PostMapping("/non-patient")
    public ResponseEntity<?> createNonPatientMedicalExamRecord(
            @RequestBody @Valid NonPatientMedicalExamRequest request
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Medical exam record created successfully")
                        .data(medicalExamServices.createNonPatientMedicalExamRecord(
                                request
                        ))
                        .build()
        );
    }

    @PostMapping("/patient")
    public ResponseEntity<?> createPatientMedicalExamRecord(
            @RequestBody @Valid PatientMedicalExamRequest request
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Medical exam record created successfully")
                        .data(medicalExamServices.createPatientMedicalExamRecord(
                                request
                        ))
                        .build()
        );
    }
}

