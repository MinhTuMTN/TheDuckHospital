package com.theduckhospital.api.services;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.theduckhospital.api.dto.request.AddPatientProfileRequest;
import com.theduckhospital.api.dto.request.CreatePatientProfileRequest;
import com.theduckhospital.api.dto.request.FindPatientCodeRequest;
import com.theduckhospital.api.dto.request.SendOTPPatientProfileRequest;
import com.theduckhospital.api.dto.request.nurse.NurseCreatePatientProfileRequest;
import com.theduckhospital.api.dto.request.nurse.NurseUpdatePatientProfileRequest;
import com.theduckhospital.api.dto.response.PatientProfileItemResponse;
import com.theduckhospital.api.dto.response.admin.PatientProfileResponse;
import com.theduckhospital.api.dto.response.nurse.NursePatientProfileItemResponse;
import com.theduckhospital.api.entity.PatientProfile;

import java.util.List;
import java.util.UUID;

public interface IPatientProfileServices {
    PatientProfile createPatientProfile(String token, CreatePatientProfileRequest request);
    PatientProfileItemResponse updatePatientProfile(String token, UUID patientProfileId, CreatePatientProfileRequest request);
    List<PatientProfileItemResponse> getActivePatientProfile(String token);
    boolean deletePatientProfile(String token, UUID patientProfileId);

    boolean deletePatientProfileAdmin(UUID patientProfileId);

    PatientProfile restorePatientProfileAdmin(UUID patientProfileId);

    PatientProfileResponse getPatientProfileByIdAdmin(UUID patientProfileId);
    PatientProfile getPatientProfileById(String token, UUID patientProfileId);

    List<NursePatientProfileItemResponse> searchPatientProfiles(String patientName, String identityNumber);

    NursePatientProfileItemResponse nurseUpdatePatientProfile(NurseUpdatePatientProfileRequest request);

    NursePatientProfileItemResponse nurseCreatePatientProfile(NurseCreatePatientProfileRequest request);

    List<PatientProfileItemResponse> patientSearchByPatientCode(String patientCode);

    PatientProfileItemResponse addPatientProfile(String authorization, AddPatientProfileRequest request);

    List<PatientProfileItemResponse> findPatientCode(FindPatientCodeRequest request);
    boolean sendOTP(SendOTPPatientProfileRequest request);
}
