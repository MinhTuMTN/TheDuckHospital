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
public class PatientProfileResponse {
    private UUID patientProfileId;
    private String fullName;
    private String identityNumber;
    private String phoneNumber;
    private String email;
    private String address;
    private Gender gender;
    private String nation;
    private Date dateOfBirth;
    private boolean deleted;
    private List<MedicalExaminationRecord> medicalExaminationRecords;
    private List<MedicalRecordResponse> medicalRecords;

    public PatientProfileResponse(PatientProfile patientProfile) {
        this.patientProfileId = patientProfile.getPatientProfileId();
        this.email = patientProfile.getEmail();
        this.fullName = patientProfile.getFullName();
        this.identityNumber = patientProfile.getIdentityNumber();
        this.phoneNumber = patientProfile.getPhoneNumber();
        this.dateOfBirth = patientProfile.getDateOfBirth();
        this.nation = patientProfile.getNation().getNationName();
        this.deleted = patientProfile.isDeleted();
        this.medicalExaminationRecords = patientProfile.getMedicalExaminationRecords();

        List<MedicalRecordResponse> medicalRecords = new ArrayList<>();
        for (MedicalExaminationRecord medicalRecord: patientProfile.getMedicalExaminationRecords()) {
            medicalRecords.add(new MedicalRecordResponse(medicalRecord, new ArrayList<>()));
        }
        this.medicalRecords = medicalRecords;

        this.gender = patientProfile.getGender();
        this.address = String.format("%s, %s, %s, %s",
                patientProfile.getStreetName(),
                patientProfile.getWard().getWardName(),
                patientProfile.getWard().getDistrict().getDistrictName(),
                patientProfile.getWard().getDistrict().getProvince().getProvinceName());
    }

    public PatientProfileResponse(PatientProfile patientProfile, boolean notShowDetails) {
        this.patientProfileId = patientProfile.getPatientProfileId();
        this.fullName = patientProfile.getFullName();
        this.phoneNumber = patientProfile.getPhoneNumber();
        this.dateOfBirth = patientProfile.getDateOfBirth();
        this.address = String.format("%s, %s",
                patientProfile.getWard().getDistrict().getDistrictName(),
                patientProfile.getWard().getDistrict().getProvince().getProvinceName());

        if (!notShowDetails) {
            this.email = patientProfile.getEmail();
            this.identityNumber = patientProfile.getIdentityNumber();
            this.nation = patientProfile.getNation().getNationName();
            this.deleted = patientProfile.isDeleted();
            this.medicalExaminationRecords = patientProfile.getMedicalExaminationRecords();
        }
    }
}
