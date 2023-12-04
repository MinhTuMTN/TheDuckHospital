package com.theduckhospital.api.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    private Gender gender;
    private Nation nation;
    private Province province;
    private District district;
    private Ward ward;
    private String streetName;

    public PatientProfileItemResponse(PatientProfile patientProfile) {
        this.patientProfileId = patientProfile.getPatientProfileId();
        this.fullName = patientProfile.getFullName();
        this.dateOfBirth = patientProfile.getDateOfBirth();
        this.phoneNumber = "*******" + patientProfile.getPhoneNumber().substring(7);
        this.gender = patientProfile.getGender();
        this.nation = patientProfile.getNation();
        this.province = patientProfile.getWard().getDistrict().getProvince();
        this.district = patientProfile.getWard().getDistrict();
        this.ward = patientProfile.getWard();
        this.streetName = patientProfile.getStreetName();
    }
}
