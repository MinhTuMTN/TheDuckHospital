package com.theduckhospital.api.controller.patient;

import com.theduckhospital.api.dto.request.CreatePatientProfileRequest;
import com.theduckhospital.api.dto.request.GeneralResponse;
import com.theduckhospital.api.services.IPatientProfileServices;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/patients/patient-profiles")
@PreAuthorize("hasRole('ROLE_USER')")
public class PatientProfileController {
    private final IPatientProfileServices patientProfileServices;

    public PatientProfileController(
            IPatientProfileServices patientProfileServices
    ) {
        this.patientProfileServices = patientProfileServices;
    }

    @PostMapping
    public ResponseEntity<?> createPatientProfile(
            @RequestHeader("Authorization") String authorization,
            @RequestBody @Valid CreatePatientProfileRequest request
            ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Create patient profile successfully")
                .data(patientProfileServices
                        .createPatientProfile(authorization, request))
                .build()
        );
    }

    @GetMapping
    public ResponseEntity<?> getActivePatientProfile(
            @RequestHeader("Authorization") String authorization
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Get active patient profile successfully")
                .data(patientProfileServices.getActivePatientProfile(authorization))
                .build()
        );
    }

    @DeleteMapping("/{patientProfileId}")
    public ResponseEntity<?> deletePatientProfile(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("patientProfileId") UUID patientProfileId
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Delete patient profile successfully")
                .data(patientProfileServices.deletePatientProfile(authorization, patientProfileId))
                .build()
        );
    }
}
