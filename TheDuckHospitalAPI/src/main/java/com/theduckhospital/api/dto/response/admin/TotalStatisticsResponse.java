package com.theduckhospital.api.dto.response.admin;

import lombok.Data;

import java.util.List;

@Data
public class TotalStatisticsResponse {
    private List<DepartmentStatisticsResponse> topDepartments;
    private long totalPatients;
    private long totalDepartments;
    private List<PieChartItemResponse> paymentMethodStatistics;

    public TotalStatisticsResponse(List<DepartmentStatisticsResponse> topDepartments,
                                   long totalPatients,
                                   long totalDepartments,
                                   List<PieChartItemResponse> paymentMethodStatistics
    ) {
        this.topDepartments = topDepartments;
        this.totalPatients = totalPatients;
        this.totalDepartments = totalDepartments;
        this.paymentMethodStatistics = paymentMethodStatistics;
    }
}
