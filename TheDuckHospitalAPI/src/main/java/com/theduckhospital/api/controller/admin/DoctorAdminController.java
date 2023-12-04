package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.dto.request.GeneralResponse;
import com.theduckhospital.api.services.IDepartmentServices;
import com.theduckhospital.api.services.IDoctorServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
}
