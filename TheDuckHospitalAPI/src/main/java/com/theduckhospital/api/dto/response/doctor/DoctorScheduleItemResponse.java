package com.theduckhospital.api.dto.response.doctor;

import com.theduckhospital.api.constant.ScheduleType;
import com.theduckhospital.api.entity.DoctorSchedule;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class DoctorScheduleItemResponse {
    private UUID doctorScheduleId;
    private String roomName;
    private String serviceName;
    private Date date;
    private ScheduleType scheduleType;

    public DoctorScheduleItemResponse(DoctorSchedule doctorSchedule) {
        this.doctorScheduleId = doctorSchedule.getDoctorScheduleId();
        this.roomName = doctorSchedule.getRoom().getRoomName();
        this.serviceName = doctorSchedule.getMedicalService().getServiceName();
        this.date = doctorSchedule.getDate();
        this.scheduleType = doctorSchedule.getScheduleType();
    }
}
