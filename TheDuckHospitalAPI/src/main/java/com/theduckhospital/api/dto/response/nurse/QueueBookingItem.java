package com.theduckhospital.api.dto.response.nurse;

import com.theduckhospital.api.entity.Booking;
import lombok.Data;

@Data
public class QueueBookingItem {
    private int queueNumber;
    private String fullName;

    public QueueBookingItem(Booking booking) {
        this.queueNumber = booking.getQueueNumber();
        this.fullName = booking.getPatientProfile().getFullName();
    }
}
