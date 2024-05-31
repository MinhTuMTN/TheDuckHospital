package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.entity.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Data
public class AccountResponse {
    private UUID userId;
    private String fullName;
    private String phoneNumber;
    private String departmentName;
    private String email;
    private String role;
    private List<PatientProfile> patientProfiles;
    private boolean headOfDepartment;
    private boolean deleted;

    public AccountResponse(Account account) {
        this.userId = account.getUserId();
        this.fullName = account.getFullName();
        this.phoneNumber = account.getPhoneNumber();
        this.email = account.getEmail();
        this.deleted = account.isDeleted();

        Staff staff = account.getStaff();
        if (staff != null) {
            if (staff instanceof Doctor) {
                this.role = "Bác sĩ";
                this.departmentName = Optional
                        .ofNullable(((Doctor) staff).getDepartment())
                        .map(Department::getDepartmentName)
                        .orElse(null);
                this.headOfDepartment = ((Doctor) staff).isHeadOfDepartment();
            } else if (staff instanceof Nurse) {
                this.role = "Điều dưỡng";
                this.departmentName = Optional
                        .ofNullable(((Nurse) staff).getDepartment())
                        .map(Department::getDepartmentName)
                        .orElse(null);
                this.headOfDepartment = ((Nurse) staff).isHeadOfDepartment();
            } else if (staff instanceof Cashier) {
                this.role = "Thu ngân";
            } else if (staff instanceof Pharmacist) {
                this.role = "Dược sĩ";
            } else if (staff instanceof LaboratoryTechnician) {
                this.role = "Bác sĩ xét nghiệm";
            } else {
                this.role = "Quản lý";
            }
        } else {
            this.role = "Bệnh nhân";
            this.patientProfiles = account.getPatientProfile();
        }
    }
}
