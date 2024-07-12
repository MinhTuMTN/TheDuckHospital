package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.entity.MedicalTest;
import lombok.Data;

@Data
public class MedicalTestResponse {
    private MedicalTest medicalTest;
    private String serviceName;
    private PatientProfileResponse patientProfile;

    public MedicalTestResponse(MedicalTest medicalTest) {
        this.medicalTest = medicalTest;
        this.serviceName = medicalTest.getMedicalService().getServiceName();
        this.patientProfile = new PatientProfileResponse(
                medicalTest.getMedicalExaminationRecord() == null ?
                        medicalTest.getHospitalAdmission().getMedicalExaminationRecord().getPatientProfile() :
                        medicalTest.getMedicalExaminationRecord().getPatientProfile()
                );
    }
}
