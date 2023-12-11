package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.constant.ScheduleType;
import com.theduckhospital.api.entity.Booking;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class MedicalRecordItemResponse {
    private UUID bookingId;
    private String bookingCode;
    private boolean status;
    private int queueNumber;
    private String roomArea;
    private String roomName;
    private String departmentName;
    private String doctorName;
    private Date date;
    private ScheduleType scheduleType;
    private double price;
    private String patientName;
    private Date patientDateOfBirth;
    private String patientCode;

    public MedicalRecordItemResponse(Booking booking) {
        this.bookingId = booking.getBookingId();
        this.bookingCode = booking.getBookingCode();
        this.status = booking.getMedicalExaminationRecord() != null;
        this.queueNumber = booking.getQueueNumber();
        this.roomArea = booking.getDoctorSchedule().getRoom().getDescription();
        this.roomName = booking.getDoctorSchedule().getRoom().getRoomName();
        this.departmentName = booking.getDoctorSchedule().getDoctor().getDepartment().getDepartmentName();
        this.doctorName = booking.getDoctorSchedule().getDoctor().getFullName();
        this.date = booking.getDoctorSchedule().getDate();
        this.scheduleType = booking.getDoctorSchedule().getScheduleType();
        this.price = booking.getDoctorSchedule().getMedicalService().getPrice();
        this.patientName = booking.getPatientProfile().getFullName();
        this.patientDateOfBirth = booking.getPatientProfile().getDateOfBirth();
        this.patientCode = booking.getPatientProfile().getPatient() != null ? booking.getPatientProfile().getPatient().getPatientCode() : null;
    }
}
