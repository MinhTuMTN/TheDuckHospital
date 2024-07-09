package com.theduckhospital.api.dto.response.nurse;

import com.theduckhospital.api.entity.Booking;
import com.theduckhospital.api.entity.DoctorSchedule;
import lombok.Data;

import java.util.List;

@Data
public class QueueBookingResponse {
    private int currentQueueNumber;
    private int maxQueueNumber;
    private int leftQueueNumber;
    private String roomName;
    private String departmentName;
    private List<QueueBookingItem> queueBookingItems;

    public QueueBookingResponse(
            DoctorSchedule doctorSchedule,
            long maxQueueNumber,
            long leftQueueNumber,
            List<Booking> bookings
    ) {
        this.currentQueueNumber = doctorSchedule.getQueueNumber();
        this.maxQueueNumber = (int) maxQueueNumber;
        this.leftQueueNumber = (int) leftQueueNumber;
        this.roomName = doctorSchedule.getRoom().getRoomName();
        this.departmentName = doctorSchedule.getRoom().getDepartment().getDepartmentName();
        this.queueBookingItems = bookings.stream().map(QueueBookingItem::new).toList();
    }
}
