package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.dto.request.admin.CreateDepartmentRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.dto.request.admin.UpdateDepartmentRequest;
import com.theduckhospital.api.services.IDepartmentServices;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/departments")
//@PreAuthorize("hasRole('ROLE_ADMIN')")
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
                        .data(departmentServices.getAllDepartments())
                        .build()
        );
    }

    @GetMapping("/filter")
    public ResponseEntity<?> getAllDepartments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int limit
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get departments pagination successfully")
                        .data(departmentServices.getPaginationDepartmentsDeleted(page, limit))
                        .build()
        );
    }

    @GetMapping("/{departmentId}")
    public ResponseEntity<?> getDepartmentById(@PathVariable int departmentId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get department by id successfully")
                        .data(departmentServices.getDepartmentResponseById(departmentId))
                        .build()
        );
    }

    @GetMapping("/{departmentId}/doctors")
    public ResponseEntity<?> getDoctorsDepartment(@PathVariable int departmentId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get doctors by department id successfully")
                        .data(departmentServices.getActiveDoctorsDepartment(departmentId))
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
            @RequestBody UpdateDepartmentRequest request) {
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
