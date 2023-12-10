package com.theduckhospital.api.dto.response.admin;

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
    private String departmentName;
    private Date dateOfBirth;
    private boolean deleted;

    public StaffResponse(Staff staff) {
        this.staffId = staff.getStaffId();
        this.fullName = staff.getFullName();
        this.phoneNumber = staff.getPhoneNumber();
        this.identityNumber = staff.getIdentityNumber();
        this.dateOfBirth = staff.getDateOfBirth();
        this.deleted = staff.isDeleted();

        if (staff instanceof Doctor) {
            this.role = "Bác sĩ";
            this.departmentName = ((Doctor) staff).getDepartment().getDepartmentName();
        } else if (staff instanceof Nurse) {
            this.role = "Điều dưỡng";
        } else if (staff instanceof Cashier) {
            this.role = "Thu ngân";
        } else if (staff instanceof Pharmacist) {
            this.role = "Dược sĩ";
        } else {
            this.role = "Quản lý";
        }
    }
}
