package com.theduckhospital.api.controller.patient;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.theduckhospital.api.dto.request.AddPatientProfileRequest;
import com.theduckhospital.api.dto.request.CreatePatientProfileRequest;
import com.theduckhospital.api.dto.request.FindPatientCodeRequest;
import com.theduckhospital.api.dto.request.SendOTPPatientProfileRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
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

    @PutMapping("/{patientProfileId}")
    public ResponseEntity<?> updatePatientProfile(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("patientProfileId") UUID patientProfileId,
            @RequestBody @Valid CreatePatientProfileRequest request
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Update patient profile successfully")
                .data(patientProfileServices.updatePatientProfile(authorization, patientProfileId, request))
                .build()
        );
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchPatientProfileByPatientCode(
            @RequestParam(name = "patientCode") String patientCode
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Search Patient Profile Successful")
                        .data(patientProfileServices.patientSearchByPatientCode(patientCode))
                        .build()
        );
    }

    @PostMapping("/add-profile")
    public ResponseEntity<?> addPatientProfile(
            @RequestHeader("Authorization") String authorization,
            @RequestBody AddPatientProfileRequest request
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Add Patient Profile Successful")
                        .data(patientProfileServices.addPatientProfile(
                                authorization,
                                request
                        ))
                        .build()
        );
    }

    @PostMapping("/search-patient_code")
    public ResponseEntity<?> searchPatientProfileByPatientCode(
            @RequestBody FindPatientCodeRequest request
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Search Patient Profile Successful")
                        .data(patientProfileServices.findPatientCode(
                                request
                        ))
                        .build()
        );
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOTP(
            @RequestBody @Valid SendOTPPatientProfileRequest request
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Send OTP Successful")
                        .data(patientProfileServices.sendOTP(
                                request
                        ))
                        .build()
        );
    }

}
