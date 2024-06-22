package com.theduckhospital.api.dto.request.nurse;

import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.constant.HospitalAdmissionState;
import com.theduckhospital.api.entity.*;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class HospitalAdmissionDetails {
    private UUID hospitalAdmissionId;
    private String hospitalAdmissionCode;
    private String patientName;
    private String patientCode;
    private Gender patientGender;
    private Date patientDateOfBirth;
    private String district;
    private String province;
    private UUID doctorId;
    private String doctorName;
    private Degree doctorDegree;
    private String diagnosis;
    private String symptom;
    private Date admissionDate;
    private Date createdDate;
    private boolean paid;

    public HospitalAdmissionDetails(HospitalAdmission hospitalAdmission) {
        this.hospitalAdmissionId = hospitalAdmission.getHospitalAdmissionId();
        this.hospitalAdmissionCode = hospitalAdmission.getHospitalAdmissionCode();

        PatientProfile patientProfile = hospitalAdmission.getPatientProfile();
        if (patientProfile != null) {
            this.patientName = patientProfile.getFullName();
            Patient patient = patientProfile.getPatient();
            this.patientCode = patient != null ? patient.getPatientCode() : null;
            this.patientGender = patientProfile.getGender();
            this.patientDateOfBirth = patientProfile.getDateOfBirth();

            District district = patientProfile.getWard().getDistrict();
            this.district = district.getDistrictName();
            this.province = district.getProvince().getProvinceName();
        }

        Doctor doctor = hospitalAdmission.getDoctor();
        if (doctor != null) {
            this.doctorId = doctor.getStaffId();
            this.doctorName = doctor.getFullName();
            this.doctorDegree = doctor.getDegree();
        }

        this.diagnosis = hospitalAdmission.getDiagnosis();
        this.symptom = hospitalAdmission.getSymptom();
        this.admissionDate = hospitalAdmission.getAdmissionDate();
        this.createdDate = hospitalAdmission.getCreatedAt();
        this.paid = hospitalAdmission.getState() == HospitalAdmissionState.WAITING_FOR_TREATMENT;
    }
}
