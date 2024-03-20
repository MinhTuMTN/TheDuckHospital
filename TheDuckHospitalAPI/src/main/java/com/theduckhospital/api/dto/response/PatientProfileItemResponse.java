package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.entity.*;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class PatientProfileItemResponse {
    private UUID patientProfileId;
    private String fullName;
    private Date dateOfBirth;
    private String phoneNumber;
    private String fullPhoneNumber;
    private String identityNumber;
    private Gender gender;
    private Nation nation;
    private Province province;
    private District district;
    private Ward ward;
    private String streetName;
    private String email;
    private String patientCode;
    private String patientId;

    public PatientProfileItemResponse(PatientProfile patientProfile) {
        this.patientProfileId = patientProfile.getPatientProfileId();
        this.fullName = patientProfile.getFullName();
        this.dateOfBirth = patientProfile.getDateOfBirth();
        this.phoneNumber = "*******" + patientProfile.getPhoneNumber().substring(7);
        this.fullPhoneNumber = patientProfile.getPhoneNumber();
        this.identityNumber = patientProfile.getIdentityNumber();
        this.gender = patientProfile.getGender();
        this.nation = patientProfile.getNation();
        this.province = patientProfile.getWard().getDistrict().getProvince();
        this.district = patientProfile.getWard().getDistrict();
        this.ward = patientProfile.getWard();
        this.streetName = patientProfile.getStreetName();
        this.email = patientProfile.getEmail();
        this.patientCode = patientProfile.getPatient() != null
                ? patientProfile.getPatient().getPatientCode()
                : null;
        this.patientId = patientProfile.getPatient() != null
                ? patientProfile.getPatient().getPatientId().toString()
                : null;
    }
}
