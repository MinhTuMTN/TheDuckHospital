package com.theduckhospital.api.dto.response.nurse;

import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.entity.*;
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
    private String streetName;
    private String wardName;
    private String districtName;
    private String provinceName;

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
        this.streetName = patientProfile.getStreetName();
        Ward ward = patientProfile.getWard();
        this.wardName = ward == null ? null : ward.getWardName();
        District district = ward == null ? null : ward.getDistrict();
        this.districtName = district == null ? null : district.getDistrictName();
        Province province = district == null ? null : district.getProvince();
        this.provinceName = province == null ? null : province.getProvinceName();

        Patient patient = patientProfile.getPatient();
        this.patientCode = patient == null ? null : patient.getPatientCode();

        this.underlyingDisease = hospitalAdmission.getHistoryOfAllergy();
        this.allergy = hospitalAdmission.getHistoryOfAllergy();
    }
}
