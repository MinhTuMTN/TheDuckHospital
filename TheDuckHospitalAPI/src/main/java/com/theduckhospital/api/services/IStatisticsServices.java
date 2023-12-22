package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.response.HomeStatisticsResponse;
import com.theduckhospital.api.dto.response.admin.BookingStatisticsResponse;
import com.theduckhospital.api.dto.response.admin.RevenueStatisticsResponse;
import com.theduckhospital.api.dto.response.admin.TotalStatisticsResponse;

import java.util.Date;

public interface IStatisticsServices {
    TotalStatisticsResponse getStatistics();

    RevenueStatisticsResponse getRevenueStatistics(Date startDate, Date endDate);

    HomeStatisticsResponse getHomeStatistics();

    BookingStatisticsResponse getBookingStatistics(Date startDate, Date endDate);
}
