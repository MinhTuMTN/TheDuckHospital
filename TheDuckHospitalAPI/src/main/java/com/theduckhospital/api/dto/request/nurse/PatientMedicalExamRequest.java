package com.theduckhospital.api.dto.request.nurse;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientMedicalExamRequest {
    @NotBlank(message = "Booking code is required")
    private String bookingCode;
    @NotNull(message = "Room id is required")
    private Integer roomId;
}
