package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.Rating;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class DoctorItemStatisticsResponse {
    private UUID doctorId;
    private String doctorName;
    private String avatar;
    private Degree degree;
    private boolean isHeadDoctor;
    private double rating;
    private int totalRatings;
    private long totalPatients;

    public DoctorItemStatisticsResponse(Doctor doctor, long totalPatients) {
        this.doctorId = doctor.getStaffId();
        this.isHeadDoctor = doctor.isHeadOfDepartment();
        this.rating = doctor.getRating();
        this.totalRatings = doctor.getRatings().size();
        this.doctorName = doctor.getFullName();
        this.avatar = doctor.getAvatar();
        this.degree = doctor.getDegree();
        this.totalPatients = totalPatients;
    }
}
