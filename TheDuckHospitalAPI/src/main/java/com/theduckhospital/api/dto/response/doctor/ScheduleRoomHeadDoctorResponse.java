package com.theduckhospital.api.dto.response.doctor;

import lombok.Data;

@Data
public class ScheduleRoomHeadDoctorResponse {
    private ScheduleRoomItemResponse morning;
    private ScheduleRoomItemResponse afternoon;

    public ScheduleRoomHeadDoctorResponse(ScheduleRoomItemResponse morning, ScheduleRoomItemResponse afternoon) {
        this.morning = morning;
        this.afternoon = afternoon;
    }
}
