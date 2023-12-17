package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.admin.CreateDepartmentRequest;
import com.theduckhospital.api.dto.request.admin.UpdateDepartmentRequest;
import com.theduckhospital.api.dto.response.admin.DepartmentResponse;
import com.theduckhospital.api.dto.response.admin.FilteredDepartmentsResponse;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Doctor;

import java.util.List;
import java.util.UUID;

public interface IDepartmentServices {
    Department createDepartment(CreateDepartmentRequest request);
    Department updateDepartment(int departmentId, UpdateDepartmentRequest request);
    boolean deleteDepartment(int departmentId);
    Department restoreDepartment(int departmentId);
    List<DepartmentResponse> getAllDepartments();
    List<Doctor> getActiveDoctorsDepartment(int departmentId);

    FilteredDepartmentsResponse getPaginationFilteredDepartments(
            String search,
            int page,
            int limit
    );

    List<Department> getAllDepartmentsDeleted();
    DepartmentResponse getDepartmentResponseById(int departmentId);
    Department getDepartmentById(int departmentId);

    Doctor addDoctorDepartment(int departmentId, UUID doctorId);

    boolean removeDoctorDepartment(int departmentId, UUID doctorId);

    List<Department> getDepartmentsWithoutServices();
}
