package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.constant.Role;
import com.theduckhospital.api.constant.ServiceType;
import com.theduckhospital.api.dto.request.admin.CreateServicesRequest;
import com.theduckhospital.api.dto.request.admin.UpdateServiceRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IMedicalServiceServices;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/filtered")
    public ResponseEntity<?> getPaginationServices(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int limit,
            @RequestParam(defaultValue = "MedicalExamination, MedicalTest") List<ServiceType> serviceTypes
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get filtered services pagination successfully")
                        .data(serviceServices.getPaginationFilteredServices(search, page, limit, serviceTypes))
                        .build()
        );
    }

    @GetMapping("/{serviceId}")
    public ResponseEntity<?> getServiceById(@PathVariable int serviceId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get all medical service pagination successfully")
                        .data(serviceServices.getMedicalServiceById(serviceId))
                        .build()
        );
    }

    @DeleteMapping("/{serviceId}")
    public ResponseEntity<?> deleteService(@PathVariable int serviceId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Service deleted successfully")
                        .data(serviceServices.deleteService(serviceId))
                        .build()
        );
    }

    @PutMapping("/{serviceId}/restore")
    public ResponseEntity<?> restoreService(@PathVariable int serviceId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Service restored successfully")
                        .data(serviceServices.restoreService(serviceId))
                        .build()
        );
    }

    @PutMapping("/{serviceId}")
    public ResponseEntity<?> updateService(
            @PathVariable int serviceId,
            @RequestBody UpdateServiceRequest request) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Service updated successfully")
                        .data(serviceServices.updateMedicalService(serviceId, request))
                        .build()
        );
    }
}
