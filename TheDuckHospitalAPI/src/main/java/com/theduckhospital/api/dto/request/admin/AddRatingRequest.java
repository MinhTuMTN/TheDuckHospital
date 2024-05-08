package com.theduckhospital.api.dto.request.admin;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class AddRatingRequest {
    @NotNull(message = "Rating is required")
    private Integer rating;
    private String review;
    @NotNull(message = "Patient Code is required")
    private String patientCode;
//    @NotNull(message = "Doctor Id is required")
//    private UUID doctorId;
    @NotNull(message = "Booking Id is required")
    private UUID bookingId;
}
