package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.dto.request.admin.CreateStaffRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IStaffServices;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/staffs")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class StaffAdminController {
    private final IStaffServices staffServices;

    public StaffAdminController(IStaffServices staffServices) {
        this.staffServices = staffServices;
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
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
}
