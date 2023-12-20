package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.constant.ScheduleType;
import com.theduckhospital.api.entity.DoctorSchedule;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class DoctorScheduleRoomResponse {
    private UUID doctorScheduleId;
    private ScheduleType scheduleType;
    private String doctorName;
    private Gender doctorGender;
    private Degree doctorDegree;
    private double price;
    private String departmentName;
    private String serviceName;
    private String roomName;
    private String phoneNumber;
    private int queueNumber;
    private long numberOfBookings;
    private int slot;
    private Date date;

    public DoctorScheduleRoomResponse(DoctorSchedule schedule, long numberOfBookings) {
        this.doctorScheduleId = schedule.getDoctorScheduleId();
        this.scheduleType = schedule.getScheduleType();
        this.doctorName = schedule.getDoctor().getFullName();
        this.doctorGender = schedule.getDoctor().getGender();
        this.doctorDegree = schedule.getDoctor().getDegree();
        this.price = schedule.getMedicalService().getPrice();
        this.serviceName = schedule.getMedicalService().getServiceName();
        this.roomName = schedule.getRoom().getRoomName();
        this.departmentName = schedule.getDoctor().getDepartment().getDepartmentName();
        this.phoneNumber = schedule.getDoctor().getPhoneNumber();
        this.queueNumber = schedule.getQueueNumber();
        this.date = schedule.getDate();
        this.numberOfBookings = numberOfBookings;
        this.slot = schedule.getSlot();
    }
}
