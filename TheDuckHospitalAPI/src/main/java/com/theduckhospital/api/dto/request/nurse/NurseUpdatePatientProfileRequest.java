package com.theduckhospital.api.dto.request.nurse;

import lombok.Data;

import java.util.UUID;

@Data
public class NurseUpdatePatientProfileRequest {
    private UUID patientProfileId;
    private String identityNumber;
}
