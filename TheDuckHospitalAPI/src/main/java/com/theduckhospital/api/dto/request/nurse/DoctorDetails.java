package com.theduckhospital.api.dto.request.nurse;

import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.entity.Doctor;
import lombok.Data;

import java.util.UUID;

@Data
public class DoctorDetails {
    private UUID doctorId;
    private String doctorName;
    private Degree doctorDegree;

    public DoctorDetails(Doctor doctor) {
        this.doctorId = doctor.getStaffId();
        this.doctorName = doctor.getFullName();
        this.doctorDegree = doctor.getDegree();
    }
}
