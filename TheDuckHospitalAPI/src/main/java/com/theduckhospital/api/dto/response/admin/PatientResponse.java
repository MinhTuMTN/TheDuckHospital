package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.entity.Patient;
import com.theduckhospital.api.entity.PatientProfile;
import lombok.Data;

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
    private Date dateOfBirth;
    private boolean deleted;
    private List<PatientProfile> patientProfiles;

    public PatientResponse(Patient patient) {
        this.patientId = patient.getPatientId();
        this.patientCode = patient.getPatientCode();
        this.fullName = patient.getFullName();
        this.identityNumber = patient.getIdentityNumber();
        this.phoneNumber = patient.getPhoneNumber();
        this.dateOfBirth = patient.getDateOfBirth();
        this.deleted = patient.isDeleted();
        this.patientProfiles = patient.getPatientProfiles();
    }
}
