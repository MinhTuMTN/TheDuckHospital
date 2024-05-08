package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.constant.ScheduleType;
import com.theduckhospital.api.entity.Booking;
import com.theduckhospital.api.entity.Rating;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class RatingResponse {
    private boolean rated;
    private double rating;
    private String review;
    private Date ratedAt;

    public RatingResponse(Booking booking) {
        this.rated = booking.isRated();
        if (booking.getRating() == null) {
            this.rating = 0;
            this.review = "Chưa đánh giá";
            this.ratedAt = new Date();
        } else {
            this.rating = booking.getRating().getRatingPoint();
            this.review = booking.getRating().getReview();
            this.ratedAt = booking.getRating().getCreatedAt();
        }
    }
}
