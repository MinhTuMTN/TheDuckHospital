package com.theduckhospital.api.dto.request.headdoctor;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class UpdateDoctorScheduleRequest {
    @NotNull(message = "Doctor ID is required")
    private UUID staffId;
    @NotNull(message = "Schedule date is required")
    private Date date;
}
