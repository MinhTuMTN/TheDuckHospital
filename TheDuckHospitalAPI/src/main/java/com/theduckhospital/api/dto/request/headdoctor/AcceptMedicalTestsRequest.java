package com.theduckhospital.api.dto.request.headdoctor;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class AcceptMedicalTestsRequest {
    UUID medicalTestId;
}
