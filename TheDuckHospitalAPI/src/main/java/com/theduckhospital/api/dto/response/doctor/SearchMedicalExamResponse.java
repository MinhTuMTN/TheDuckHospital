package com.theduckhospital.api.dto.response.doctor;

import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.constant.MedicalExamState;
import com.theduckhospital.api.entity.MedicalExaminationRecord;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class SearchMedicalExamResponse {
    private UUID medicalExaminationId;
    private String patientName;
    private Gender patientGender;
    private Date patientDateOfBirth;
    private String patientAddress;
    private String patientCode;
    private MedicalExamState state;

    public SearchMedicalExamResponse(MedicalExaminationRecord examinationRecord) {
        this.medicalExaminationId = examinationRecord.getMedicalExaminationRecordId();
        this.patientName = examinationRecord.getPatientProfile().getFullName();
        this.patientGender = examinationRecord.getPatientProfile().getGender();
        this.patientDateOfBirth = examinationRecord.getPatientProfile().getDateOfBirth();
        this.patientAddress = examinationRecord.getPatientProfile().getWard().getDistrict().getProvince().getProvinceName();
        this.patientCode = examinationRecord.getPatient().getPatientCode();
        this.state = examinationRecord.getState();
    }
}
