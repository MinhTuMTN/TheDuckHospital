package com.theduckhospital.api.dto.response.doctor;

import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.DoctorSchedule;
import lombok.Data;

import java.util.UUID;

@Data
public class ScheduleRoomItemResponse {
    private UUID doctorScheduleId;
    private int slot;
    private Doctor doctor;
    private long numberOfBookings;

    public ScheduleRoomItemResponse(DoctorSchedule schedule, long numberOfBookings) {
        if(schedule == null) {
            this.doctorScheduleId = null;
            this.doctor = null;
            this.slot = 0;
        } else {
            this.doctorScheduleId = schedule.getDoctorScheduleId();
            this.doctor = schedule.getDoctor();
            this.slot = schedule.getSlot();
        }
        this.numberOfBookings = numberOfBookings;
    }
}
