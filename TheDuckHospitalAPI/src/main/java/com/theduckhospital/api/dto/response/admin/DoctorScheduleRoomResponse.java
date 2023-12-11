package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.constant.ScheduleType;
import com.theduckhospital.api.entity.DoctorSchedule;
import lombok.Data;

import java.util.List;
import java.util.Date;
import java.util.UUID;

@Data
public class DoctorScheduleRoomResponse {
    private UUID doctorScheduleId;
    private ScheduleType scheduleType;
    private String doctorName;
    private String phoneNumber;
    private int queueNumber;
    private long numberOfBookings;
    private Date date;

    public DoctorScheduleRoomResponse(DoctorSchedule schedule, long numberOfBookings) {
        this.doctorScheduleId = schedule.getDoctorScheduleId();
        this.scheduleType = schedule.getScheduleType();
        this.doctorName = schedule.getDoctor().getFullName();
        this.phoneNumber = schedule.getDoctor().getPhoneNumber();
        this.queueNumber = schedule.getQueueNumber();
        this.date = schedule.getDate();
        this.numberOfBookings = numberOfBookings;
    }
}
