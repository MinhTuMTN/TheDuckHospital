package com.theduckhospital.api.dto.response.nurse;

import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.entity.*;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class InpatientPatientResponse {
    private UUID hospitalAdmissionId;
    private String patientCode;
    private String patientName;
    private Gender patientGender;
    private Date patientBirthDate;
    private Date admissionDate;
    private String streetName;
    private String wardName;
    private String districtName;
    private String provinceName;

    public InpatientPatientResponse(HospitalAdmission hospitalAdmission) {
        this.hospitalAdmissionId = hospitalAdmission.getHospitalAdmissionId();
        PatientProfile patientProfile = hospitalAdmission.getPatientProfile();
        this.patientCode = patientProfile.getPatient().getPatientCode();
        this.patientName = patientProfile.getFullName();
        this.patientGender = patientProfile.getGender();
        this.patientBirthDate = patientProfile.getDateOfBirth();
        this.admissionDate = hospitalAdmission.getAdmissionDate();
        this.streetName = patientProfile.getStreetName();
        Ward ward = patientProfile.getWard();
        this.wardName = ward == null ? null : ward.getWardName();
        District district = ward == null ? null : ward.getDistrict();
        this.districtName = district == null ? null : district.getDistrictName();
        Province province = district == null ? null : district.getProvince();
        this.provinceName = province == null ? null : province.getProvinceName();
    }
}
