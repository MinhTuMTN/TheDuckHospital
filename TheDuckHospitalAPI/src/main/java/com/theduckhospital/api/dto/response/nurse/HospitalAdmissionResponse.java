package com.theduckhospital.api.dto.response.nurse;

import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.entity.HospitalAdmission;
import com.theduckhospital.api.entity.Patient;
import com.theduckhospital.api.entity.PatientProfile;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class HospitalAdmissionResponse {
    private UUID hospitalAdmissionId;
    private String hospitalAdmissionCode;
    private Date admissionDate;
    private String patientName;
    private String patientCode;
    private Gender patientGender;
    private Date patientBirthDate;
    private String underlyingDisease;
    private String allergy;

    public HospitalAdmissionResponse(HospitalAdmission hospitalAdmission) {
        this.hospitalAdmissionId = hospitalAdmission.getHospitalAdmissionId();
        this.hospitalAdmissionCode = hospitalAdmission.getHospitalAdmissionCode();
        this.admissionDate = hospitalAdmission.getAdmissionDate();

        PatientProfile patientProfile = hospitalAdmission.getPatientProfile();
        if (patientProfile == null) {
            return;
        }

        this.patientName = patientProfile.getFullName();
        this.patientGender = patientProfile.getGender();
        this.patientBirthDate = patientProfile.getDateOfBirth();

        Patient patient = patientProfile.getPatient();
        this.patientCode = patient == null ? null : patient.getPatientCode();

        this.underlyingDisease = hospitalAdmission.getHistoryOfAllergy();
        this.allergy = hospitalAdmission.getHistoryOfAllergy();
    }
}
