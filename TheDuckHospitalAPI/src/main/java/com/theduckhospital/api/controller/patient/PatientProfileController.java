package com.theduckhospital.api.controller.patient;

import com.theduckhospital.api.dto.request.CreatePatientProfileRequest;
import com.theduckhospital.api.dto.request.GeneralResponse;
import com.theduckhospital.api.services.IPatientProfileServices;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patients/patient-profiles")
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
}
