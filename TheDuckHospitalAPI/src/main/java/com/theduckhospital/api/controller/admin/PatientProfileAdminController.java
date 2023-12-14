package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.dto.request.admin.CreateRoomRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IMedicalExamServices;
import com.theduckhospital.api.services.IPatientProfileServices;
import com.theduckhospital.api.services.IRoomServices;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/admin/patient-profiles")
//@PreAuthorize("hasRole('ROLE_ADMIN')")
public class PatientProfileAdminController {
    private final IPatientProfileServices patientProfileServices;
    private final IMedicalExamServices medicalExamServices;

    public PatientProfileAdminController(
            IPatientProfileServices patientProfileServices,
            IMedicalExamServices medicalExamServices
    ) {
        this.patientProfileServices = patientProfileServices;
        this.medicalExamServices = medicalExamServices;
    }

    @DeleteMapping("/{patientProfileId}")
    public ResponseEntity<?> deletePatientProfile(@PathVariable UUID patientProfileId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Delete patient profile successfully")
                        .data(patientProfileServices.deletePatientProfileAdmin(patientProfileId))
                        .build()
        );
    }

    @PutMapping("/{patientProfileId}/restore")
    public ResponseEntity<?> restorePatientProfile(@PathVariable UUID patientProfileId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Restore patient profile successfully")
                        .data(patientProfileServices.restorePatientProfileAdmin(patientProfileId))
                        .build()
        );
    }

    @GetMapping("/{patientProfileId}")
    public ResponseEntity<?> getPatientProfileById(@PathVariable UUID patientProfileId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get patient profile successfully")
                        .data(patientProfileServices.getPatientProfileByIdAdmin(patientProfileId))
                        .build()
        );
    }

    @GetMapping("/{patientProfileId}/medical-records")
    public ResponseEntity<?> getMedicalRecordsByPatientProfileId(@PathVariable UUID patientProfileId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get medical records successfully")
                        .data(medicalExamServices.getMedicalRecordsByPatientProfile(patientProfileId))
                        .build()
        );
    }
}
