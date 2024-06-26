package com.theduckhospital.api.dto.request.doctor;

import lombok.Data;

import java.util.Date;

@Data
public class HospitalAdmissionRequest {
    private Date admissionDate;
    private String diagnosis;
    private String symptom;
    private String underlyingDisease;
    private String historyOfAllergy;
}
