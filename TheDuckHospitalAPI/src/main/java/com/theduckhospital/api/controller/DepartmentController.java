package com.theduckhospital.api.controller;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IDepartmentServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {
    private final IDepartmentServices departmentServices;

    public DepartmentController(IDepartmentServices departmentServices) {
        this.departmentServices = departmentServices;
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
}
