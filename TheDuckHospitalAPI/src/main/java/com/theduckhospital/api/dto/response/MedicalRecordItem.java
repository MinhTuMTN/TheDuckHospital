package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.entity.MedicalExaminationRecord;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class MedicalRecordItem {
    private UUID medicalRecordId;
    private String departmentName;
    private String doctorName;
    private Date date;

    public MedicalRecordItem(MedicalExaminationRecord examinationRecord) {
        this.medicalRecordId = examinationRecord.getMedicalExaminationRecordId();
        this.departmentName = examinationRecord.getDoctorSchedule().getDoctor().getDepartment().getDepartmentName();
        this.doctorName = examinationRecord.getDoctorSchedule().getDoctor().getFullName();
        this.date = examinationRecord.getDoctorSchedule().getDate();
    }
}
