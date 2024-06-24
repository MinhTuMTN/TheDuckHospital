package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.dto.response.RatingItemResponse;
import com.theduckhospital.api.entity.Booking;
import com.theduckhospital.api.entity.Rating;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
public class RatingStatisticsResponse {
    private List<RatingItemResponse> ratings;
    private long totalRatings;
    private double ratingPoint;
    Map<Integer, Long> ratingStatistics;

    public RatingStatisticsResponse(
            List<RatingItemResponse> ratings,
            long totalRatings,
            double ratingPoint,
            Map<Integer, Long> ratingStatistics
    ) {
        this.ratings = ratings;
        this.totalRatings = totalRatings;
        this.ratingPoint = ratingPoint;
        this.ratingStatistics = ratingStatistics;
    }
}
