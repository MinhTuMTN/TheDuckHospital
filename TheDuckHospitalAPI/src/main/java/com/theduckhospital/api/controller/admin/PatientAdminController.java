package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.dto.request.admin.CreateRoomRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IPatientServices;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/admin/patients")
//@PreAuthorize("hasRole('ROLE_ADMIN')")
public class PatientAdminController {
    private final IPatientServices patientServices;

    public PatientAdminController(IPatientServices patientServices) {
        this.patientServices = patientServices;
    }

    @GetMapping("/filter")
    public ResponseEntity<?> getAllPatients(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int limit
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get all patients pagination successfully")
                        .data(patientServices.getPaginationPatientsDeleted(page, limit))
                        .build()
        );
    }

    @GetMapping("/{patientId}")
    public  ResponseEntity<?> getPatientById(@PathVariable UUID patientId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get patient by id successfully")
                        .data(patientServices.getPatientById(patientId))
                        .build()
        );
    }
}
