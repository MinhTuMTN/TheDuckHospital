package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.entity.Booking;
import com.theduckhospital.api.entity.Patient;
import com.theduckhospital.api.entity.Rating;
import lombok.Data;

import java.util.Date;

@Data
public class RatingItemResponse {
    private double rating;
    private String review;
    private Date ratedAt;
    private String patientName;

    public RatingItemResponse(Rating rating) {
        this.rating = rating.getRatingPoint();
        this.review = rating.getReview();
        this.ratedAt = rating.getCreatedAt();
        Patient patient = rating.getPatient();
        this.patientName = patient != null ? rating.getPatient().getFullName() : "";
    }
}
