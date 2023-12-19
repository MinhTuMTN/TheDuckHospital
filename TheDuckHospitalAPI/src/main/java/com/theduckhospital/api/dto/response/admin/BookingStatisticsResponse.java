package com.theduckhospital.api.dto.response.admin;

import lombok.Data;

import java.util.List;

@Data
public class BookingStatisticsResponse {
    private List<Long> values;
    private List<String> labels;

    public BookingStatisticsResponse(List<Long> values, List<String> labels) {
        this.values = values;
        this.labels = labels;
    }
}
