package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.constant.ScheduleType;
import com.theduckhospital.api.entity.DoctorSchedule;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class DoctorScheduleItemResponse {
    private UUID doctorScheduleId;
    private int slot;
    private int queueNumber = 0;
    private int dayOfWeek;
    private Date date;
    private ScheduleType scheduleType;
    private boolean deleted;
    private Date createdDate;
    private Date updatedDate;
    private boolean available;

    public DoctorScheduleItemResponse(DoctorSchedule doctorSchedule) {
        this.doctorScheduleId = doctorSchedule.getDoctorScheduleId();
        this.slot = doctorSchedule.getSlot();
        this.queueNumber = doctorSchedule.getQueueNumber();
        this.dayOfWeek = doctorSchedule.getDayOfWeek();
        this.date = doctorSchedule.getDate();
        this.scheduleType = doctorSchedule.getScheduleType();
        this.deleted = doctorSchedule.isDeleted();
        this.createdDate = doctorSchedule.getCreatedDate();
        this.updatedDate = doctorSchedule.getUpdatedDate();
        this.available = doctorSchedule.getBookings()
                .stream()
                .filter(booking -> !booking.isDeleted())
                .count() < doctorSchedule.getSlot();
    }
}
