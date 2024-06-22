package com.theduckhospital.api.dto.response.admin;

import lombok.Data;

import java.util.List;

@Data
public class TotalStatisticsByDepartmentResponse {
    private List<DoctorItemStatisticsResponse> topDoctors;
    private long totalPatients;
    private long totalDoctors;
    private long totalNurses;
//    private List<PieChartItemResponse> paymentMethodStatistics;

    public TotalStatisticsByDepartmentResponse(List<DoctorItemStatisticsResponse> topDoctors,
                                               long totalPatients,
                                               long totalDoctors,
                                               long totalNurses
//                                               List<PieChartItemResponse> paymentMethodStatistics
    ) {
        this.topDoctors = topDoctors;
        this.totalPatients = totalPatients;
        this.totalDoctors = totalDoctors;
        this.totalNurses = totalNurses;
//        this.paymentMethodStatistics = paymentMethodStatistics;
    }
}
