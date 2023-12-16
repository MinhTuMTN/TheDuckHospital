package com.theduckhospital.api.controller.nurse;

import com.theduckhospital.api.dto.request.nurse.NurseCreatePatientProfileRequest;
import com.theduckhospital.api.dto.request.nurse.NurseUpdatePatientProfileRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IPatientProfileServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/nurse/patient-profiles")
public class NursePatientProfileController {
    private final IPatientProfileServices patientProfileServices;

    public NursePatientProfileController(IPatientProfileServices patientProfileServices) {
        this.patientProfileServices = patientProfileServices;
    }

    @GetMapping
    public ResponseEntity<?> searchPatientProfiles(
            @RequestParam(name = "patientName") String patientName,
            @RequestParam(name = "identityNumber", defaultValue = "") String identityNumber
    ) {
        if (patientName == null || patientName.trim().isEmpty())
            return ResponseEntity.badRequest()
                    .body(
                            GeneralResponse.builder()
                                    .success(false)
                                    .message("Patient name is required")
                                    .build()
                    );

        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Search patient profiles successfully")
                        .data(
                                patientProfileServices.searchPatientProfiles(
                                        patientName,
                                        identityNumber
                                )
                        )
                        .build()
        );
    }

    @PutMapping
    public ResponseEntity<?> updatePatientProfile(
            @RequestBody NurseUpdatePatientProfileRequest request
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Update patient profile successfully")
                        .data(
                                patientProfileServices.nurseUpdatePatientProfile(
                                        request
                                )
                        )
                        .build()
        );
    }

    @PostMapping
    public ResponseEntity<?> createPatientProfile(
            @RequestBody NurseCreatePatientProfileRequest request
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Create patient profile successfully")
                        .data(
                                patientProfileServices.nurseCreatePatientProfile(
                                        request
                                )
                        )
                        .build()
        );
    }
}
