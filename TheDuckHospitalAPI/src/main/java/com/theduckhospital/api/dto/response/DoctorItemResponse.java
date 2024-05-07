package com.theduckhospital.api.dto.response;

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
public class DoctorItemResponse {
    private UUID doctorId;
    private String doctorName;
    private Gender gender;
    private Degree degree;
    private Department department;
    private List<DoctorScheduleItemResponse> doctorSchedules;
    private double price;
    private double rating;
    private int totalRating;
    private List<RatingItemResponse> ratings;
    private String avatar;

    public DoctorItemResponse(Doctor doctor) {
        this.doctorId = doctor.getStaffId();
        this.rating = doctor.getRating();
        this.totalRating = doctor.getRatings().size();
        this.avatar = doctor.getAvatar();
        List<RatingItemResponse> ratingList= new ArrayList<>();
        for (Rating rating: doctor.getRatings()) {
            ratingList.add(new RatingItemResponse(rating));
        }
        this.ratings = ratingList;
        doctorName = doctor.getFullName();
        degree = doctor.getDegree();
        gender = doctor.getGender();
        department = doctor.getDepartment();
        doctorSchedules = doctor.getDoctorSchedules().stream().filter(
                doctorSchedule -> !doctorSchedule.isDeleted()
        ).map(DoctorScheduleItemResponse::new).toList();
        price = doctor.getDoctorSchedules().stream().filter(
                doctorSchedule -> !doctorSchedule.isDeleted()
        ).mapToDouble(ds -> ds.getMedicalService().getPrice()).min().orElse(0);
    }
}
