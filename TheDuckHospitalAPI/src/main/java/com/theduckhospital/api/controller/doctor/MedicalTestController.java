package com.theduckhospital.api.controller.doctor;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IMedicalServiceServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/doctor/medical-tests")
@PreAuthorize("hasAnyRole('ROLE_DOCTOR', 'ROLE_HEAD_DOCTOR')")
public class MedicalTestController {
    private final IMedicalServiceServices medicalServiceServices;

    public MedicalTestController(IMedicalServiceServices medicalServiceServices) {
        this.medicalServiceServices = medicalServiceServices;
    }

    @GetMapping
    public ResponseEntity<?> getAllMedicalTests() {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalServiceServices.doctorGetAllMedicalTests())
                        .build()
        );
    }
}
