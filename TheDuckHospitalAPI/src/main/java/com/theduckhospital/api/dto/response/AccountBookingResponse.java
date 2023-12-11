package com.theduckhospital.api.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class AccountBookingResponse {
    private String fullName;
    private List<BookingItemResponse> bookings;
}
