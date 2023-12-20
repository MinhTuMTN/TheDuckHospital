package com.theduckhospital.api.dto.response;

import lombok.Data;

@Data
public class HomeStatisticsResponse {
    private long totalDoctors;
    private long totalDepartments;

    public HomeStatisticsResponse(long totalDoctors, long totalDepartments) {
        this.totalDoctors = totalDoctors;
        this.totalDepartments = totalDepartments;
    }
}
