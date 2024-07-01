package com.theduckhospital.api.dto.response.doctor;

import lombok.Data;

@Data
public class ScheduleRoomHeadDoctorResponse {
    private ScheduleRoomItemResponse morning;
    private ScheduleRoomItemResponse afternoon;
    private ScheduleRoomItemResponse evening;
    private ScheduleRoomItemResponse night;

    public ScheduleRoomHeadDoctorResponse(
            ScheduleRoomItemResponse morning,
            ScheduleRoomItemResponse afternoon,
            ScheduleRoomItemResponse evening,
            ScheduleRoomItemResponse night
    ) {
        this.morning = morning;
        this.afternoon = afternoon;
        this.evening = evening;
        this.night = night;
    }
}
