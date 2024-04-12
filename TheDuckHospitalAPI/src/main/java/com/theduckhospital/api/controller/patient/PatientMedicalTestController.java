package com.theduckhospital.api.controller.patient;

import com.theduckhospital.api.dto.request.PayMedicalTestRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IMedicalTestServices;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/medical-tests")
@PreAuthorize("hasRole('ROLE_USER')")
public class PatientMedicalTestController {
    private final IMedicalTestServices medicalTestServices;

    public PatientMedicalTestController(IMedicalTestServices medicalTestServices) {
        this.medicalTestServices = medicalTestServices;
    }

    @GetMapping("/{medicalTestCode}")
    public ResponseEntity<?> getMedicalTestDetails(
            @PathVariable("medicalTestCode") String medicalTestCode
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Get medical test details successfully")
                .data(medicalTestServices
                        .patientGetMedicalTestDetails(
                                medicalTestCode
                        )
                )
                .statusCode(200)
                .build()
        );
    }

    @PostMapping("/payment")
    public ResponseEntity<?> payMedicalTest(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody PayMedicalTestRequest payMedicalTestRequest,
            HttpServletRequest request
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Pay medical test successfully")
                .data(medicalTestServices
                        .patientPayMedicalTest(
                                token,
                                payMedicalTestRequest,
                                request.getHeader("origin")
                        )
                )
                .statusCode(200)
                .build()
        );
    }
}
