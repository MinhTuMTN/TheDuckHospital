package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.dto.request.admin.CreateStaffRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IStaffServices;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/staffs")
//@PreAuthorize("hasRole('ROLE_ADMIN')")
public class StaffAdminController {
    private final IStaffServices staffServices;

    public StaffAdminController(IStaffServices staffServices) {
        this.staffServices = staffServices;
    }

    @PostMapping
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createStaff(@RequestBody @Valid CreateStaffRequest request) {
        Map<String, Object> result = staffServices.createStaff(request);
        if (result == null) {
            return ResponseEntity.badRequest().body(
                    GeneralResponse.builder()
                            .success(false)
                            .message("Cannot create staff")
                            .build()
            );
        }
        return ResponseEntity.ok()
                .body(GeneralResponse.builder()
                                .success(true)
                                .message("Create staff successfully")
                                .data(result)
                                .build()
                );
    }

    @GetMapping
    public ResponseEntity<?> getAllStaffs() {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get all staff successfully")
                        .data(staffServices.getAllStaffs())
                        .build()
        );
    }

    @GetMapping("/{staffId}")
    public  ResponseEntity<?> getStaffById(@PathVariable UUID staffId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get staff by id successfully")
                        .data(staffServices.getStaffById(staffId))
                        .build()
        );
    }

    @DeleteMapping("/{staffId}")
    public ResponseEntity<?> deleteStaff(@PathVariable UUID staffId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Delete staff successfully")
                        .data(staffServices.deleteStaff(staffId))
                        .build()
        );
    }

    @PutMapping("/{staffId}/restore")
    public ResponseEntity<?> restoreRoom(@PathVariable UUID staffId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Restore staff successfully")
                        .data(staffServices.restoreStaff(staffId))
                        .build()
        );
    }
}
