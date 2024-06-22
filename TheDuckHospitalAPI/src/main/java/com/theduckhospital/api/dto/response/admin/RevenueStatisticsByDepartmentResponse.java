package com.theduckhospital.api.dto.response.admin;

import lombok.Data;

import java.util.List;

@Data
public class RevenueStatisticsByDepartmentResponse {
    private List<Double> totalValues;
    private List<Double> examinationValues;
    private List<Double> admissionValues;
    private List<String> labels;

    public RevenueStatisticsByDepartmentResponse(
            List<Double> totalValues,
            List<Double> examinationValues,
            List<Double> admissionValues,
            List<String> labels
    ) {
        this.totalValues = totalValues;
        this.examinationValues = examinationValues;
        this.admissionValues = admissionValues;
        this.labels = labels;
    }
}
