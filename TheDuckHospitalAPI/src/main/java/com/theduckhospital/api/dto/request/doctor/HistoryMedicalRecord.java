package com.theduckhospital.api.dto.request.doctor;

import com.theduckhospital.api.entity.MedicalExaminationRecord;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class HistoryMedicalRecord {
    private UUID medicalRecordId;
    private Date date;
    private String department;

    public HistoryMedicalRecord(MedicalExaminationRecord record) {
        this.medicalRecordId = record.getMedicalExaminationRecordId();
        this.date = record.getDoctorSchedule().getDate();
        this.department = record
                .getDoctorSchedule()
                .getDoctor()
                .getDepartment()
                .getDepartmentName();
    }
}
