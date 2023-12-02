package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.dto.request.CreateDepartmentRequest;
import com.theduckhospital.api.dto.request.GeneralResponse;
import com.theduckhospital.api.services.IDepartmentServices;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/departments")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class DepartmentAdminController {
    private final IDepartmentServices departmentServices;

    public DepartmentAdminController(IDepartmentServices departmentServices) {
        this.departmentServices = departmentServices;
    }
    @PostMapping
    public ResponseEntity<?> createDepartment(@RequestBody @Valid CreateDepartmentRequest request) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Department created successfully")
                        .data(departmentServices.createDepartment(request))
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<?> getAllDepartments() {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get all departments successfully")
                        .data(departmentServices.getAllDepartmentsDeleted())
                        .build()
        );
    }

    @DeleteMapping("/{departmentId}")
    public ResponseEntity<?> deleteDepartment(@PathVariable int departmentId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Department deleted successfully")
                        .data(departmentServices.deleteDepartment(departmentId))
                        .build()
        );
    }

    @PutMapping("/{departmentId}")
    public ResponseEntity<?> updateDepartment(
            @PathVariable int departmentId,
            @RequestBody CreateDepartmentRequest request) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Department updated successfully")
                        .data(departmentServices.updateDepartment(departmentId, request))
                        .build()
        );
    }

    @PutMapping("/{departmentId}/restore")
    public ResponseEntity<?> restoreDepartment(@PathVariable int departmentId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Department restored successfully")
                        .data(departmentServices.restoreDepartment(departmentId))
                        .build()
        );
    }
}
