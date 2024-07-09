package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.DoctorSchedule;
import com.theduckhospital.api.entity.Rating;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class DoctorItemResponse {
    private UUID doctorId;
    private String doctorName;
    private String avatar;
    private Gender gender;
    private Degree degree;
    private Department department;
    private List<DoctorScheduleItemResponse> doctorSchedules;
    private double price;
    private double rating;
    private int totalRating;
    private List<RatingItemResponse> ratings;

    public DoctorItemResponse(Doctor doctor, List<DoctorSchedule> doctorSchedules, double price) {
        this.doctorId = doctor.getStaffId();
        this.rating = doctor.getRating();
        this.totalRating = doctor.getRatings().size();
        List<RatingItemResponse> ratingList= new ArrayList<>();
        for (Rating rating: doctor.getRatings()) {
            ratingList.add(new RatingItemResponse(rating));
        }
        this.ratings = ratingList;
        doctorName = doctor.getFullName();
        avatar = doctor.getAvatar();
        degree = doctor.getDegree();
        gender = doctor.getGender();
        department = doctor.getDepartment();
        this.price = price;
        this.doctorSchedules = new ArrayList<>();
        for (DoctorSchedule doctorSchedule: doctorSchedules) {
            this.doctorSchedules.add(new DoctorScheduleItemResponse(doctorSchedule));
        }
    }
}
