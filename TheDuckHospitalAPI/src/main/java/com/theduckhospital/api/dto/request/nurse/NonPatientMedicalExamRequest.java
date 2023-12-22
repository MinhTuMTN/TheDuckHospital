package com.theduckhospital.api.dto.request.nurse;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class NonPatientMedicalExamRequest {
    @NotBlank(message = "Booking code is required")
    private String bookingCode;
    private String identityNumber;
    @NotNull(message = "Room id is required")
    private Integer roomId;
}
