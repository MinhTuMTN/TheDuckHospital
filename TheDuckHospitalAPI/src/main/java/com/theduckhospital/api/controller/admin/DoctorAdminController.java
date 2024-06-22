package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IDoctorServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/doctors")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class DoctorAdminController {
    private final IDoctorServices doctorServices;

    public DoctorAdminController(IDoctorServices doctorServices) {
        this.doctorServices = doctorServices;
    }

    @DeleteMapping("/{staffId}/head-doctor")
    public ResponseEntity<?> deleteHeadDoctor(@PathVariable UUID staffId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Head Doctor deleted successfully")
                        .data(doctorServices.deleteHeadDoctor(staffId))
                        .build()
        );
    }

    @GetMapping("/not-in-department")
    public ResponseEntity<?> getDoctorsNotInDepartment() {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get all doctor not in department successfully")
                        .data(doctorServices.getDoctorNotInDepartment())
                        .build()
        );
    }


    @GetMapping("/patient-statistics")
    public ResponseEntity<?> getPatientStatistics(
            @RequestParam Date startDate,
            @RequestParam Date endDate,
            @RequestParam UUID staffId
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get patient statistics successfully")
                        .data(doctorServices.getPatientStatistics(startDate, endDate, staffId))
                        .build()
        );
    }

    @GetMapping("/{staffId}/reviews")
    public ResponseEntity<?> getReviews(@PathVariable UUID staffId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get reviews successfully")
                        .data(doctorServices.getReviews(staffId))
                        .build()
        );
    }
}
