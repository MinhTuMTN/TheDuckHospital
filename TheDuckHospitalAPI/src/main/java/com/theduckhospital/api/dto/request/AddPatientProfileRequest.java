package com.theduckhospital.api.dto.request;

import lombok.Data;

import java.util.UUID;

@Data
public class AddPatientProfileRequest {
    private UUID patientProfileId;
    private String phoneNumber;
}
