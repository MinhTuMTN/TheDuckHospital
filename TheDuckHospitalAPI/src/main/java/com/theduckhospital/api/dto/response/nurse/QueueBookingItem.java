package com.theduckhospital.api.dto.response.nurse;

import com.theduckhospital.api.entity.*;
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
        PatientProfile patientProfile = booking.getPatientProfile();
        this.fullName = patientProfile != null ? patientProfile.getFullName() : "";
        Account account = patientProfile != null ? patientProfile.getAccount() : null;
        this.userId = account != null ? account.getUserId() : null;
        TimeSlot timeSlot = booking.getTimeSlot();
        DoctorSchedule doctorSchedule = timeSlot != null ? timeSlot.getDoctorSchedule() : null;
        Room room = doctorSchedule != null ? doctorSchedule.getRoom() : null;
        this.roomName = room != null ? room.getRoomName() : "";
    }
}
