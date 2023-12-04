package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.CreatePatientProfileRequest;
import com.theduckhospital.api.entity.PatientProfile;

public interface IPatientProfileServices {
    PatientProfile createPatientProfile(String token, CreatePatientProfileRequest request);
}
