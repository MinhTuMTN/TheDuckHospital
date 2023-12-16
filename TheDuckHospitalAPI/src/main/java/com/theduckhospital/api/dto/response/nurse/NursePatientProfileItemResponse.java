package com.theduckhospital.api.dto.response.nurse;


import com.theduckhospital.api.dto.response.PatientProfileItemResponse;
import com.theduckhospital.api.entity.PatientProfile;


public class NursePatientProfileItemResponse extends PatientProfileItemResponse {
    public NursePatientProfileItemResponse(PatientProfile patientProfile) {
        super(patientProfile);
        this.setPhoneNumber(patientProfile.getPhoneNumber());
    }
}
