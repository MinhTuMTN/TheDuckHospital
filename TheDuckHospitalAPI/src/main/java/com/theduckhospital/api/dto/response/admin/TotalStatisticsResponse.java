package com.theduckhospital.api.dto.response.admin;

import lombok.Data;

import java.util.List;

@Data
public class TotalStatisticsResponse {
    private List<DepartmentStatisticsResponse> topDepartments;
    private long totalPatients;
    private List<PieChartItemResponse> paymentMethodStatistics;

    public TotalStatisticsResponse(List<DepartmentStatisticsResponse> topDepartments,
                                   long totalPatients,
                                   List<PieChartItemResponse> paymentMethodStatistics
    ) {
        this.topDepartments = topDepartments;
        this.totalPatients = totalPatients;
        this.paymentMethodStatistics = paymentMethodStatistics;
    }
}
