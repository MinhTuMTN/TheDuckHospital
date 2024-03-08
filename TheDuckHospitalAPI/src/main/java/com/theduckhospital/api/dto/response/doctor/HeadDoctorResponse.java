package com.theduckhospital.api.dto.response.doctor;

import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Doctor;
import lombok.Data;

@Data
public class HeadDoctorResponse {
    private Doctor doctor;
    private Department department;

    public HeadDoctorResponse(Doctor doctor, Department department) {
        this.doctor = doctor;
        this.department = department;
    }
}
