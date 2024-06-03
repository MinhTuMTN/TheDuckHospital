package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.BookingRequest;
import com.theduckhospital.api.dto.request.nurse.NurseCreateBookingRequest;
import com.theduckhospital.api.dto.response.AccountBookingResponse;
import com.theduckhospital.api.dto.response.MedicalRecordItemResponse;
import com.theduckhospital.api.dto.response.PaymentResponse;
import com.theduckhospital.api.dto.response.nurse.NurseBookingItemResponse;
import com.theduckhospital.api.entity.Booking;

import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface IBookingServices {
    PaymentResponse createBookingAndPayment(String token, BookingRequest request, String origin);
    List<AccountBookingResponse> getBookings(String token);
    MedicalRecordItemResponse getBooking(String token, UUID bookingId);
    NurseBookingItemResponse checkBooking(String bookingCode, int roomId) throws ParseException;
    Booking bookingIsValid(String bookingCode, int roomId) throws ParseException;
    Map<String, String> checkPatientCode(String identityNumber);
    Booking nurseCreateMedicalExamRecord(NurseCreateBookingRequest request) throws ParseException;
}
