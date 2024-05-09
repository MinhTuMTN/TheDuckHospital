package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.entity.*;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class StaffResponse {
    private UUID staffId;
    private String fullName;
    private String phoneNumber;
    private String identityNumber;
    private String role;
    private int gender;
    private String email;
    private Department department;
    private String departmentName;
    private Date dateOfBirth;
    private boolean headOfDepartment;
    private Degree degree;
    private String avatar;
    private boolean deleted;

    public StaffResponse(Staff staff) {
        this.staffId = staff.getStaffId();
        this.fullName = staff.getFullName();
        this.phoneNumber = staff.getPhoneNumber();
        this.identityNumber = staff.getIdentityNumber();
        this.dateOfBirth = staff.getDateOfBirth();
        this.gender = staff.getGender().ordinal();
        this.email = staff.getAccount().getEmail();
        this.deleted = staff.isDeleted();
        this.avatar = staff.getAvatar();

        if (staff instanceof Doctor) {
            this.role = "Bác sĩ";
            this.departmentName = ((Doctor) staff).getDepartment().getDepartmentName();
            this.department = ((Doctor) staff).getDepartment();
            this.headOfDepartment = ((Doctor) staff).isHeadOfDepartment();
            this.degree = ((Doctor) staff).getDegree();
        } else if (staff instanceof Nurse) {
            this.role = "Điều dưỡng";
        } else if (staff instanceof Cashier) {
            this.role = "Thu ngân";
        } else if (staff instanceof Pharmacist) {
            this.role = "Dược sĩ";
        } else if (staff instanceof LaboratoryTechnician) {
            this.role = "Bác sĩ xét nghiệm";
        } else {
            this.role = "Quản lý";
        }
    }
}
