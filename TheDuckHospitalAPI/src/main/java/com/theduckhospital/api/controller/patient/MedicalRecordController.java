package com.theduckhospital.api.controller.patient;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IMedicalExamServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/medical-records")
@PreAuthorize("hasRole('ROLE_USER')")
public class MedicalRecordController {
    private final IMedicalExamServices medicalExamServices;

    public MedicalRecordController(IMedicalExamServices medicalExamServices) {
        this.medicalExamServices = medicalExamServices;
    }

    @GetMapping
    public ResponseEntity<?> getMedicalRecords(
            @RequestHeader("Authorization") String authorization
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Get medical records successfully")
                .data(medicalExamServices.patientGetMedicalRecords(authorization))
                .build()
        );
    }

    @GetMapping("/{medicalRecordId}")
    public ResponseEntity<?> getMedicalRecordDetails(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("medicalRecordId") UUID medicalRecordId
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Get medical record details successfully")
                .data(medicalExamServices
                        .patientGetMedicalRecordDetails(
                                authorization,
                                medicalRecordId
                        )
                )
                .build()
        );
    }
}
