package com.theduckhospital.api.dto.response;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class AccountBookingResponse {
    private String fullName;
    private UUID patientProfileId;
    private List<BookingItemResponse> bookings;
}
