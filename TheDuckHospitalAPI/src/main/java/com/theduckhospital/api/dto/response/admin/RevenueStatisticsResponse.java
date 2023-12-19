package com.theduckhospital.api.dto.response.admin;

import lombok.Data;

import java.util.List;

@Data
public class RevenueStatisticsResponse {
    private List<Double> values;
    private List<String> labels;

    public RevenueStatisticsResponse(List<Double> values, List<String> labels) {
        this.values = values;
        this.labels = labels;
    }
}
