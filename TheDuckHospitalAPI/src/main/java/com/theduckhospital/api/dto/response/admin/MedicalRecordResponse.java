package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.constant.MedicalExamState;
import com.theduckhospital.api.constant.ScheduleType;
import com.theduckhospital.api.entity.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class MedicalRecordResponse {
    private String roomName;
    private String departmentName;
    private Doctor doctor;
    private String doctorEmail;
    private Date reExamDate;
    private DoctorSchedule doctorSchedule;
    private double price;
    private List<PrescriptionItemResponse> prescription;
    private List<PrescriptionItem> prescription2;
    private Prescription prescription3;
    private String diagnosis;
    private String symptom;
    private MedicalExamState state;

    public MedicalRecordResponse(MedicalExaminationRecord record, List<PrescriptionItemResponse> prescription) {
        this.roomName = record.getDoctorSchedule().getRoom().getRoomName();
        this.departmentName = record.getDoctorSchedule().getRoom().getDepartment().getDepartmentName();
        this.doctor = record.getDoctorSchedule().getDoctor();
        this.doctorEmail = record.getDoctorSchedule().getDoctor().getAccount().getEmail();
        this.doctorSchedule = record.getDoctorSchedule();
        this.prescription = prescription;
        if(record.getPrescription() != null) {
            this.price = record.getPrescription().getTotalCost();
        } else {
            this.price = 0;
        }
        this.state = record.getState();
        this.reExamDate = record.getReExaminationDate();
        this.diagnosis = record.getDiagnosis();
        this.symptom = record.getSymptom();
    }
}
