package com.theduckhospital.api.dto.response.doctor;

import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.constant.MedicalTestState;
import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.entity.MedicalExaminationRecord;
import com.theduckhospital.api.entity.MedicalTest;
import com.theduckhospital.api.entity.Patient;
import com.theduckhospital.api.entity.PatientProfile;
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
    private boolean paid;

    public SearchMedicalTestResponse(
            MedicalExaminationRecord examinationRecord,
            MedicalTest medicalTest
    ) {
        this.medicalTestId = medicalTest.getMedicalTestId();

        Patient patientProfile = examinationRecord.getPatient();
        this.patientName = patientProfile.getFullName();
        this.patientGender = patientProfile.getGender();
        this.patientDateOfBirth = patientProfile.getDateOfBirth();
        this.serviceName = medicalTest.getMedicalService().getServiceName();
        this.patientCode = patientProfile.getPatientCode();
        this.note = medicalTest.getNote();
        this.queueNumber = medicalTest.getQueueNumber();
        this.state = medicalTest.getState();
        this.paid = medicalTest.getTransaction() != null && medicalTest.getTransaction().getStatus() == TransactionStatus.SUCCESS;
    }
}
