package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.response.admin.BookingStatisticsResponse;
import com.theduckhospital.api.dto.response.admin.RevenueStatisticsResponse;
import com.theduckhospital.api.dto.response.admin.TotalStatisticsResponse;

import java.util.Date;

public interface IStatisticsServices {
    TotalStatisticsResponse getStatistics();

    RevenueStatisticsResponse getRevenueStatistics(Date startDate, Date endDate);

    BookingStatisticsResponse getBookingStatistics(Date startDate, Date endDate);
}
