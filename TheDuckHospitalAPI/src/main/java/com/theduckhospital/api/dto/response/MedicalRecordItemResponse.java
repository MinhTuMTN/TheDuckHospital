package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.constant.ScheduleType;
import com.theduckhospital.api.entity.Booking;
import com.theduckhospital.api.entity.Rating;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class MedicalRecordItemResponse {
    private UUID bookingId;
    private String bookingCode;
    private UUID medicalRecordId;
    private boolean status;
    private int queueNumber;
    private String roomArea;
    private String roomName;
    private String departmentName;
    private Degree doctorDegree;
    private String doctorName;
    private String doctorAvatar;
    private Date date;
    private ScheduleType scheduleType;
    private double price;
    private String patientName;
    private Gender patientGender;
    private Date patientDateOfBirth;
    private String patientProvince;
    private String patientCode;
    private int timeId;
    private boolean cancelled;
    private boolean refunded;
    private RatingResponse rating;

    public MedicalRecordItemResponse(Booking booking) {
        this.bookingId = booking.getBookingId();
        this.bookingCode = booking.getBookingCode();
        this.status = booking.getMedicalExaminationRecord() != null;
        if (booking.getMedicalExaminationRecord() != null) {
            this.medicalRecordId = booking.getMedicalExaminationRecord().getMedicalExaminationRecordId();
        } else {
            this.medicalRecordId = null;
        }
        this.queueNumber = booking.getQueueNumber();
        this.roomArea = booking.getTimeSlot().getDoctorSchedule().getRoom().getDescription();
        this.roomName = booking.getTimeSlot().getDoctorSchedule().getRoom().getRoomName();
        this.departmentName = booking.getTimeSlot().getDoctorSchedule().getDoctor().getDepartment().getDepartmentName();
        this.doctorName = booking.getTimeSlot().getDoctorSchedule().getDoctor().getFullName();
        this.doctorDegree = booking.getTimeSlot().getDoctorSchedule().getDoctor().getDegree();
        this.doctorAvatar = booking.getTimeSlot().getDoctorSchedule().getDoctor().getAvatar();
        this.date = booking.getTimeSlot().getDate();
        this.scheduleType = booking.getTimeSlot().getDoctorSchedule().getScheduleType();
        this.price = booking.getTimeSlot().getDoctorSchedule().getMedicalService().getPrice();
        this.patientName = booking.getPatientProfile().getFullName();
        this.patientGender = booking.getPatientProfile().getGender();
        this.patientDateOfBirth = booking.getPatientProfile().getDateOfBirth();
        this.patientProvince = booking.getPatientProfile().getWard().getDistrict().getProvince().getProvinceName();
        this.patientCode = booking.getPatientProfile().getPatient() != null ? booking.getPatientProfile().getPatient().getPatientCode() : null;
        this.timeId = booking.getTimeSlot().getTimeId();
        this.cancelled = booking.isCancelled();
        this.refunded = booking.getRefundedTransactionId() != null;
        this.rating = new RatingResponse(booking);
    }
}
