package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IDoctorServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/admin/doctors")
//@PreAuthorize("hasRole('ROLE_ADMIN')")
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
                        .message("Department deleted successfully")
                        .data(doctorServices.deleteHeadDoctor(staffId))
                        .build()
        );
    }

    @GetMapping("/not-in-department")
    public ResponseEntity<?> getAllDepartments() {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get all doctor not in department successfully")
                        .data(doctorServices.getDoctorNotInDepartment())
                        .build()
        );
    }
}
