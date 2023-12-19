package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Doctor;
import lombok.Data;

import java.util.UUID;

@Data
public class DepartmentStatisticsResponse {
    private int departmentId;
    private String departmentName;
    private UUID headDoctorId;
    private String headDoctorName;
    private long totalPatients;

    public DepartmentStatisticsResponse(Department department, Doctor headDoctor, long totalPatients) {
        this.departmentId = department.getDepartmentId();
        this.departmentName = department.getDepartmentName();
        if (headDoctor != null) {
            this.headDoctorId = headDoctor.getStaffId();
            this.headDoctorName = headDoctor.getFullName();
        }
        this.totalPatients = totalPatients;
    }
}
