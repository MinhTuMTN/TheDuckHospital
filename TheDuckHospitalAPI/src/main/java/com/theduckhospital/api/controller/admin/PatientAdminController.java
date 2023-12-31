package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IPatientServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/admin/patients")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class PatientAdminController {
    private final IPatientServices patientServices;

    public PatientAdminController(IPatientServices patientServices) {
        this.patientServices = patientServices;
    }

    @GetMapping("/filtered")
    public ResponseEntity<?> getFilteredPatientsPagination(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int limit
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get filtered patients pagination successfully")
                        .data(patientServices.getPaginationFilteredPatients(search, page, limit))
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
