package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Doctor;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class DepartmentResponse {
    private int departmentId;
    private String departmentName;
    private String description;
    private UUID headDoctorId;
    private String headDoctorName;
    private Doctor headDoctor;
    private List<Doctor> doctors;
    private int totalDoctors;
    private boolean deleted;

    public DepartmentResponse(Department department, Doctor headDoctor) {
        this.departmentId = department.getDepartmentId();
        this.departmentName = department.getDepartmentName();
        this.description = department.getDescription();
        if (headDoctor != null) {
            this.headDoctorId = headDoctor.getStaffId();
            this.headDoctorName = headDoctor.getFullName();
            this.headDoctor = headDoctor;
        }
        this.totalDoctors = department.getDoctors().size();
        this.doctors = department.getDoctors();
        this.deleted = department.isDeleted();
    }
}
