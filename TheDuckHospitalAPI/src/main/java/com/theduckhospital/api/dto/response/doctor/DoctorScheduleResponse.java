package com.theduckhospital.api.dto.response.doctor;

import com.theduckhospital.api.constant.ScheduleSession;
import com.theduckhospital.api.entity.DoctorSchedule;
import lombok.Data;

import java.util.UUID;

@Data
public class DoctorScheduleResponse {
    private UUID doctorScheduleId;
    private String serviceName;
    private String roomName;
    private ScheduleSession scheduleSession;
    private String date;

    public DoctorScheduleResponse(DoctorSchedule doctorSchedule) {
        this.doctorScheduleId = doctorSchedule.getDoctorScheduleId();
        this.serviceName = doctorSchedule.getMedicalService().getServiceName();
        this.roomName = doctorSchedule.getRoom().getRoomName();
        this.scheduleSession = doctorSchedule.getScheduleSession();
        this.date = doctorSchedule.getDate().toString();
    }
}
