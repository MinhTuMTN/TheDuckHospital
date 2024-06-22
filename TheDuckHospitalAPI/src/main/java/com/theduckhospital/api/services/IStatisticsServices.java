package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.response.HomeStatisticsResponse;
import com.theduckhospital.api.dto.response.admin.*;

import java.util.Date;

public interface IStatisticsServices {
    TotalStatisticsResponse getStatistics();
    TotalStatisticsByDepartmentResponse getStatisticsByDepartment(int departmentId);
    RevenueStatisticsResponse getRevenueStatistics(Date startDate, Date endDate);
    RevenueStatisticsByDepartmentResponse getRevenueStatisticsByDepartment(
            int departmentId,
            Date startDate,
            Date endDate
    );
    HomeStatisticsResponse getHomeStatistics();

    BookingStatisticsResponse getBookingStatistics(Date startDate, Date endDate);
    BookingStatisticsResponse getBookingStatisticsByDepartment(int departmentId, Date startDate, Date endDate);
}
