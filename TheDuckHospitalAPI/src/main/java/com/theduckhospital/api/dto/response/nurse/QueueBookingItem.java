package com.theduckhospital.api.dto.response.nurse;

import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Booking;
import lombok.Data;

import java.util.UUID;

@Data
public class QueueBookingItem {
    private int queueNumber;
    private String fullName;
    private UUID userId;
    private String roomName;

    public QueueBookingItem(Booking booking) {
        this.queueNumber = booking.getQueueNumber();
        this.fullName = booking.getPatientProfile().getFullName();
        this.userId = booking.getPatientProfile().getAccount().getUserId();
        this.roomName = booking.getTimeSlot().getDoctorSchedule().getRoom().getRoomName();
    }
}
