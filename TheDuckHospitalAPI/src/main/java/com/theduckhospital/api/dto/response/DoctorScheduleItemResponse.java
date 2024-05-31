package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.constant.ScheduleSession;
import com.theduckhospital.api.entity.DoctorSchedule;
import com.theduckhospital.api.entity.TimeSlot;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class DoctorScheduleItemResponse {
    private UUID doctorScheduleId;
    private int slot;
    private int queueNumber = 0;
    private int dayOfWeek;
    private Date date;
    private ScheduleSession scheduleSession;
    private boolean deleted;
    private Date createdDate;
    private Date updatedDate;
    private List<TimeSlot> timeSlots;
    private boolean available;

    public DoctorScheduleItemResponse(DoctorSchedule doctorSchedule) {
        this.doctorScheduleId = doctorSchedule.getDoctorScheduleId();
        this.slot = doctorSchedule.getSlot();
        this.queueNumber = doctorSchedule.getQueueNumber();
        this.dayOfWeek = doctorSchedule.getDayOfWeek();
        this.date = doctorSchedule.getDate();
        this.scheduleSession = doctorSchedule.getScheduleSession();
        this.deleted = doctorSchedule.isDeleted();
        this.createdDate = doctorSchedule.getCreatedDate();
        this.updatedDate = doctorSchedule.getUpdatedDate();
        this.timeSlots = doctorSchedule.getTimeSlots();
        this.available = doctorSchedule.getTimeSlots()
                .stream()
                .anyMatch(timeSlot ->
                        !timeSlot.isDeleted()
                                && timeSlot.getCurrentSlot() < timeSlot.getMaxSlot()
                );
    }
}
