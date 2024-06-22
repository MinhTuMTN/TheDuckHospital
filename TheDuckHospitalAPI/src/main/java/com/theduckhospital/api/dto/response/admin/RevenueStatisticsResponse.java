package com.theduckhospital.api.dto.response.admin;

import lombok.Data;

import java.util.List;

@Data
public class RevenueStatisticsResponse {
    private List<Double> values;
    private List<Double> bookingValues;
    private List<Double> testValues;
    private List<String> labels;

    public RevenueStatisticsResponse(
            List<Double> values,
            List<Double> bookingValues,
            List<Double> testValues,
            List<String> labels
    ) {
        this.values = values;
        this.bookingValues = bookingValues;
        this.testValues = testValues;
        this.labels = labels;
    }
}
