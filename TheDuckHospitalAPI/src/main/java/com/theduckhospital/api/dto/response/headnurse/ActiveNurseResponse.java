package com.theduckhospital.api.dto.response.headnurse;

import com.theduckhospital.api.constant.NurseType;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Nurse;
import lombok.Data;

import java.util.UUID;

@Data
public class ActiveNurseResponse {
    private UUID staffId;
    private String fullName;
    private String phoneNumber;
    private Department department;
    private NurseType nurseType;
    private String email;
    private String avatar;

    public ActiveNurseResponse(Nurse nurse) {
        this.staffId = nurse.getStaffId();
        this.fullName = nurse.getFullName();
        this.phoneNumber = nurse.getPhoneNumber();
        this.department = nurse.getDepartment();
        this.nurseType = nurse.getNurseType();
        this.email = nurse.getAccount().getEmail();
        this.avatar = nurse.getAvatar();
    }
}
