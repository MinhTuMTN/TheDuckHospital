package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.dto.response.admin.PatientProfileResponse;
import com.theduckhospital.api.entity.MedicalTest;
import com.theduckhospital.api.entity.PatientProfile;
import lombok.Data;

@Data
public class PatientMedicalTestDetailsResponse {
    PatientProfileResponse patientProfile;
    MedicalTestResponse medicalTest;
    boolean paid;

    public PatientMedicalTestDetailsResponse(PatientProfile patientProfile, MedicalTest medicalTest) {
        this.patientProfile = new PatientProfileResponse(patientProfile, true);
        this.medicalTest = new MedicalTestResponse(medicalTest);
        this.paid = medicalTest.getTransaction() != null && medicalTest.getTransaction().getStatus() == TransactionStatus.SUCCESS;
    }
}
