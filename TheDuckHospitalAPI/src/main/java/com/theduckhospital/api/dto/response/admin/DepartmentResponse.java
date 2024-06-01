package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.Nurse;
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
    private UUID headNurseId;
    private String headNurseName;
    private Nurse headNurse;
    private List<Nurse> nurses;
    private int totalDoctors;
    private boolean deleted;

    public DepartmentResponse(Department department, Doctor headDoctor, Nurse headNurse) {
        this.departmentId = department.getDepartmentId();
        this.departmentName = department.getDepartmentName();
        this.description = department.getDescription();
        if (headDoctor != null) {
            this.headDoctorId = headDoctor.getStaffId();
            this.headDoctorName = headDoctor.getFullName();
            this.headDoctor = headDoctor;
        }
        if (headNurse != null) {
            this.headNurseId = headNurse.getStaffId();
            this.headNurseName = headNurse.getFullName();
            this.headNurse = headNurse;
        }
        this.totalDoctors = department.getDoctors().size();
        this.doctors = department.getDoctors();
        this.nurses = department.getNurses();
        this.deleted = department.isDeleted();
    }
}
