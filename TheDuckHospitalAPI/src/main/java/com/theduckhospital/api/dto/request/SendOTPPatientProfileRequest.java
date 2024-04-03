package com.theduckhospital.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class SendOTPPatientProfileRequest {
    @NotNull(message = "Patient profile id is required")
    private UUID patientProfileId;
    @NotBlank(message = "Phone number is required")
    private String phoneNumber;
}
