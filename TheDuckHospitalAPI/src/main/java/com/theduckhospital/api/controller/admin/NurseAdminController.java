package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.INurseServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/admin/nurses")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class NurseAdminController {
    private final INurseServices nurseServices;

    public NurseAdminController(INurseServices nurseServices) {
        this.nurseServices = nurseServices;
    }

    @DeleteMapping("/{staffId}/head-nurse")
    public ResponseEntity<?> deleteHeadNurrse(@PathVariable UUID staffId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Head Nurse deleted successfully")
                        .data(nurseServices.deleteHeadNurse(staffId))
                        .build()
        );
    }

    @GetMapping("/not-in-department")
    public ResponseEntity<?> getNursesNotInDepartment() {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get all nurse not in department successfully")
                        .data(nurseServices.getNursesNotInDepartment())
                        .build()
        );
    }
}
