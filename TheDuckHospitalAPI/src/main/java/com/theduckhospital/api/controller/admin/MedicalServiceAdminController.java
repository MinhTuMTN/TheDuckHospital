package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.dto.request.CreateServicesRequest;
import com.theduckhospital.api.dto.request.GeneralResponse;
import com.theduckhospital.api.services.IMedicalServiceServices;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/services")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class MedicalServiceAdminController {
    private final IMedicalServiceServices serviceServices;

    public MedicalServiceAdminController(IMedicalServiceServices serviceServices) {
        this.serviceServices = serviceServices;
    }

    @PostMapping
    public ResponseEntity<?> createService(@RequestBody @Valid CreateServicesRequest request) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Service created successfully")
                        .data(serviceServices.createService(request))
                        .build()
        );
    }
}
