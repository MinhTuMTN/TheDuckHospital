package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.entity.MedicalExaminationRecord;
import com.theduckhospital.api.entity.Patient;
import com.theduckhospital.api.entity.PatientProfile;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class PatientResponse {
    private UUID patientId;
    private String patientCode;
    private String fullName;
    private String identityNumber;
    private String phoneNumber;
    private Gender gender;
    private Date dateOfBirth;
    private boolean deleted;
    private List<PatientProfileResponse> patientProfiles;

    public PatientResponse(Patient patient) {
        this.patientId = patient.getPatientId();
        this.patientCode = patient.getPatientCode();
        this.fullName = patient.getFullName();
        this.gender = patient.getGender();
        this.identityNumber = patient.getIdentityNumber();
        this.phoneNumber = patient.getPhoneNumber();
        this.dateOfBirth = patient.getDateOfBirth();
        this.deleted = patient.isDeleted();
        List<PatientProfileResponse> profiles = new ArrayList<>();
        for (PatientProfile patientProfile: patient.getPatientProfiles()) {
            PatientProfileResponse patientProfileResponse = new PatientProfileResponse(patientProfile);
            profiles.add(patientProfileResponse);
        }
        this.patientProfiles = profiles;
    }
}
