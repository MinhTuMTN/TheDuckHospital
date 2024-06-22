package com.theduckhospital.api.dto.response.doctor;

import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.entity.District;
import com.theduckhospital.api.entity.PatientProfile;
import com.theduckhospital.api.entity.Province;
import com.theduckhospital.api.entity.Ward;
import lombok.Data;

import java.util.Date;
import java.util.Objects;

@Data
public class MedicalRecordPatient {
    private String fullName;
    private Gender gender;
    private Date dateOfBirth;
    private String address;
    private String street;
    private String ward;
    private String district;
    private String province;
    private String nationality;
    private String phoneNumber;
    private String patientCode;

    public MedicalRecordPatient(PatientProfile patientProfile, String patientCode) {
        this.fullName = patientProfile.getFullName();
        this.gender = patientProfile.getGender();
        this.dateOfBirth = patientProfile.getDateOfBirth();
        this.street = patientProfile.getStreetName();

        Ward ward = patientProfile.getWard();
        this.ward = ward.getWardName();
        District district = ward.getDistrict();
        this.district = district.getDistrictName();
        Province province = district.getProvince();
        this.province = province.getProvinceName();
        this.address = province.getProvinceName();
        this.phoneNumber = patientProfile.getPhoneNumber();
        this.patientCode = patientCode;

        this.nationality = patientProfile.getNation() == null
                ? null
                : patientProfile.getNation().getNationName();
    }
}
