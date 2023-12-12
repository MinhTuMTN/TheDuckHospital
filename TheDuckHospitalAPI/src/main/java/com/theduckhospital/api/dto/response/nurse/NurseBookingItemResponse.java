package com.theduckhospital.api.dto.response.nurse;

import com.theduckhospital.api.dto.response.PatientProfileItemResponse;
import com.theduckhospital.api.entity.Booking;
import lombok.Data;

import java.util.UUID;

@Data
public class NurseBookingItemResponse {
    private UUID bookingId;
    private String bookingCode;
    private PatientProfileItemResponse patientProfile;
    private int queueNumber;

    public NurseBookingItemResponse(Booking booking) {
        this.bookingId = booking.getBookingId();
        this.bookingCode = booking.getBookingCode();
        this.patientProfile = new PatientProfileItemResponse(booking.getPatientProfile());
        this.queueNumber = booking.getQueueNumber();
    }
}
