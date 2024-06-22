package com.theduckhospital.api.dto.response.admin;

import lombok.Data;

import java.util.List;

@Data
public class PatientStatisticsResponse {
    private List<Long> values;
    private List<String> labels;

    public PatientStatisticsResponse(List<Long> values, List<String> labels) {
        this.values = values;
        this.labels = labels;
    }
}
