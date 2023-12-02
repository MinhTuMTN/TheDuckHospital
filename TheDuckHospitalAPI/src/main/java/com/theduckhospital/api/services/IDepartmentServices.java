package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.CreateDepartmentRequest;
import com.theduckhospital.api.entity.Department;

import java.util.List;

public interface IDepartmentServices {
    Department createDepartment(CreateDepartmentRequest request);
    Department updateDepartment(int departmentId, CreateDepartmentRequest request);
    boolean deleteDepartment(int departmentId);
    Department restoreDepartment(int departmentId);
    List<Department> getAllDepartments();
    List<Department> getAllDepartmentsDeleted();
    Department getDepartmentById(int departmentId);
}
