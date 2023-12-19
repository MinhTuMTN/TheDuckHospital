package com.theduckhospital.api.dto.response.doctor;

import com.theduckhospital.api.entity.MedicalExaminationRecord;
import com.theduckhospital.api.entity.PrescriptionItem;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class HistoryMedicalRecord {
    private MedicalRecordPatient patient;
    private Date createdAt;
    private String symptom;
    private String diagnosis;
    private Date date;
    private String doctorName;
    private List<DoctorMedicalTestResponse> medicalTests;
    private List<PrescriptionItem> prescriptionItems;
    private Date reExaminationDate;

    public HistoryMedicalRecord(MedicalExaminationRecord medicalExaminationRecord) {
        this.patient = new MedicalRecordPatient(
                medicalExaminationRecord.getPatientProfile(),
                medicalExaminationRecord.getPatient().getPatientCode()
        );
        this.createdAt = medicalExaminationRecord.getCreatedDate();
        this.symptom = medicalExaminationRecord.getSymptom();
        this.diagnosis = medicalExaminationRecord.getDiagnosis();
        this.date = medicalExaminationRecord.getDoctorSchedule().getDate();
        this.doctorName = medicalExaminationRecord.getDoctorSchedule().getDoctor().getFullName();
        this.medicalTests = medicalExaminationRecord.getMedicalTest().stream()
                .filter(medicalTest -> !medicalTest.isDeleted())
                .map(DoctorMedicalTestResponse::new)
                .toList();
        this.prescriptionItems = medicalExaminationRecord.getPrescription()
                .getPrescriptionItems()
                .stream()
                .filter(prescriptionItem -> !prescriptionItem.isDeleted())
                .toList();
        this.reExaminationDate = medicalExaminationRecord.getReExaminationDate();
    }
}
