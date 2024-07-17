package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.entity.*;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class ActiveDoctorResponse {
    private UUID staffId;
    private String fullName;
    private String phoneNumber;
    private Department department;
    private List<MedicalService> medicalServices;
    private String email;

    public ActiveDoctorResponse(Doctor doctor) {
        this.staffId = doctor.getStaffId();
        this.fullName = doctor.getFullName();
        this.phoneNumber = doctor.getPhoneNumber();
        this.department = doctor.getDepartment();
        if (doctor.getDepartment() != null) {
            this.medicalServices = doctor.getDepartment().getMedicalServices();
        }
        this.email = doctor.getAccount() == null ? "Chưa cập nhật" : doctor.getAccount().getEmail();
    }
}
