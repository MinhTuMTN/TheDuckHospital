package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.entity.Booking;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class BookingItemResponse {
    private UUID bookingId;
    private String departmentName;
    private String doctorName;
    private Date date;
    private int queueNumber;
    private boolean status;
    private boolean cancelled;

    public BookingItemResponse(Booking booking) {
        this.bookingId = booking.getBookingId();
        this.departmentName = booking.getTimeSlot().getDoctorSchedule().getDoctor().getDepartment().getDepartmentName();
        this.doctorName = booking.getTimeSlot().getDoctorSchedule().getDoctor().getFullName();
        this.date = booking.getTimeSlot().getDoctorSchedule().getDate();
        this.queueNumber = booking.getQueueNumber();
        this.status = booking.getMedicalExaminationRecord() != null;
        this.cancelled = booking.isCancelled();
    }
}
