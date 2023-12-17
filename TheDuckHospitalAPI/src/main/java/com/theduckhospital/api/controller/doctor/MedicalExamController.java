package com.theduckhospital.api.controller.doctor;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IMedicalExamServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/doctor/medical-records")
@PreAuthorize("hasAnyRole('ROLE_DOCTOR', 'ROLE_HEAD_DOCTOR')")
public class MedicalExamController {
    private final IMedicalExamServices medicalExamServices;

    public MedicalExamController(IMedicalExamServices medicalExamServices) {
        this.medicalExamServices = medicalExamServices;
    }

    @PutMapping("/{medicalExaminationId}/accept")
    public ResponseEntity<?> acceptMedicalExamination(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("medicalExaminationId") UUID medicalExaminationId
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalExamServices.acceptMedicalExamination(authorization, medicalExaminationId))
                        .build()
        );
    }

    @GetMapping("/{medicalExaminationId}")
    public ResponseEntity<?> getMedicalExamination(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("medicalExaminationId") UUID medicalExaminationId
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalExamServices.doctorGetMedicalExamination(authorization, medicalExaminationId))
                        .build()
        );
    }
}
