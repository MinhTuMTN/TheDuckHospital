package com.theduckhospital.api.dto.response.doctor;

import com.theduckhospital.api.entity.MedicalExaminationRecord;
import lombok.Data;

import java.util.Date;

@Data
public class DoctorMedicalRecordResponse {
    private MedicalRecordPatient patient;
    private Date createdAt;
    private String symptom;
    private String diagnosis;

    public DoctorMedicalRecordResponse(MedicalExaminationRecord medicalExaminationRecord) {
        this.patient = new MedicalRecordPatient(
                medicalExaminationRecord.getPatientProfile(),
                medicalExaminationRecord.getPatient().getPatientCode()
        );
        this.createdAt = medicalExaminationRecord.getCreatedDate();
        this.symptom = medicalExaminationRecord.getSymptom();
        this.diagnosis = medicalExaminationRecord.getDiagnosis();
    }
}
