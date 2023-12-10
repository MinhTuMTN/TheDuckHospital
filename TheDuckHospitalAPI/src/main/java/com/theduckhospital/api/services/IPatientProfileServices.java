package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.CreatePatientProfileRequest;
import com.theduckhospital.api.dto.response.PatientProfileItemResponse;
import com.theduckhospital.api.entity.PatientProfile;

import java.util.List;
import java.util.UUID;

public interface IPatientProfileServices {
    PatientProfile createPatientProfile(String token, CreatePatientProfileRequest request);
    PatientProfileItemResponse updatePatientProfile(String token, UUID patientProfileId, CreatePatientProfileRequest request);
    List<PatientProfileItemResponse> getActivePatientProfile(String token);
    boolean deletePatientProfile(String token, UUID patientProfileId);
    PatientProfile getPatientProfileById(String token, UUID patientProfileId);
}
