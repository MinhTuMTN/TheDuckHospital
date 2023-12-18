package com.theduckhospital.api.dto.response.doctor;

import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.entity.PatientProfile;
import lombok.Data;

import java.util.Date;

@Data
public class MedicalRecordPatient {
    private String fullName;
    private Gender gender;
    private Date dateOfBirth;
    private String address;
    private String phoneNumber;
    private String patientCode;

    public MedicalRecordPatient(PatientProfile patientProfile, String patientCode) {
        this.fullName = patientProfile.getFullName();
        this.gender = patientProfile.getGender();
        this.dateOfBirth = patientProfile.getDateOfBirth();
        this.address = patientProfile.getWard().getDistrict().getProvince().getProvinceName();
        this.phoneNumber = patientProfile.getPhoneNumber();
        this.patientCode = patientCode;
    }
}
