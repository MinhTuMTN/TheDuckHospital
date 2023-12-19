package com.theduckhospital.api.dto.response.doctor;

import com.theduckhospital.api.dto.request.doctor.HistoryMedicalRecord;
import com.theduckhospital.api.entity.MedicalExaminationRecord;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class DoctorMedicalRecordResponse {
    private MedicalRecordPatient patient;
    private Date createdAt;
    private String symptom;
    private String diagnosis;
    List<HistoryMedicalRecord> history;

    public DoctorMedicalRecordResponse(
            MedicalExaminationRecord medicalExaminationRecord,
            List<MedicalExaminationRecord> medicalExaminationRecords
    ) {
        this.patient = new MedicalRecordPatient(
                medicalExaminationRecord.getPatientProfile(),
                medicalExaminationRecord.getPatient().getPatientCode()
        );
        this.createdAt = medicalExaminationRecord.getCreatedDate();
        this.symptom = medicalExaminationRecord.getSymptom();
        this.diagnosis = medicalExaminationRecord.getDiagnosis();
        this.history = medicalExaminationRecords
                .stream()
                .map(HistoryMedicalRecord::new)
                .toList();
    }
}
