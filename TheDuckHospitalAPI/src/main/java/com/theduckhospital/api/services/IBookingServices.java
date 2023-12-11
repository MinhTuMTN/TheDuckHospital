package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.BookingRequest;
import com.theduckhospital.api.dto.response.AccountBookingResponse;
import com.theduckhospital.api.dto.response.MedicalRecordItemResponse;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface IBookingServices {
    String createBookingAndPayment(String token, BookingRequest request);
    UUID checkBookingCallback(Map<String, String> vnpParams);

    List<AccountBookingResponse> getBookings(String token);

    MedicalRecordItemResponse getBooking(String token, UUID bookingId);
}
