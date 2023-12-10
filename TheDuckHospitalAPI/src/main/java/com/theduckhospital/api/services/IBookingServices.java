package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.BookingRequest;

import java.util.Map;

public interface IBookingServices {
    String createBookingAndPayment(String token, BookingRequest request);
    boolean checkBookingCallback(Map<String, String> vnpParams);
}
