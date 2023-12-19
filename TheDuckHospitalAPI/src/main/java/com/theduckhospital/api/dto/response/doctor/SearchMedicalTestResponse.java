package com.theduckhospital.api.dto.response.doctor;

import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.constant.MedicalTestState;
import com.theduckhospital.api.entity.MedicalExaminationRecord;
import com.theduckhospital.api.entity.MedicalTest;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class SearchMedicalTestResponse {
    private UUID medicalTestId;
    private String patientName;
    private Gender patientGender;
    private Date patientDateOfBirth;
    private String patientCode;
    private String note;
    private String serviceName;
    private int queueNumber;
    private MedicalTestState state;

    public SearchMedicalTestResponse(
            MedicalExaminationRecord examinationRecord,
            MedicalTest medicalTest
    ) {
        this.medicalTestId = medicalTest.getMedicalTestId();
        this.patientName = examinationRecord.getPatientProfile().getFullName();
        this.patientGender = examinationRecord.getPatientProfile().getGender();
        this.patientDateOfBirth = examinationRecord.getPatientProfile().getDateOfBirth();
        this.serviceName = medicalTest.getMedicalService().getServiceName();
        this.patientCode = examinationRecord.getPatient().getPatientCode();
        this.note = medicalTest.getNote();
        this.queueNumber = medicalTest.getQueueNumber();
        this.state = medicalTest.getState();
    }
}
