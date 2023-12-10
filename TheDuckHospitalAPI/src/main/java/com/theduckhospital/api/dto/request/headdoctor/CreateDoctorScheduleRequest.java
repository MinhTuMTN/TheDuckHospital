package com.theduckhospital.api.dto.request.headdoctor;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class CreateDoctorScheduleRequest {
    @NotNull(message = "Doctor ID is required")
    private UUID doctorId;
    @NotNull(message = "Medical Service ID is required")
    private Integer medicalServiceId;
    @NotNull(message = "Start time is required")
    private Date startTime;
    @NotNull(message = "End time is required")
    private Date endTime;
    @NotNull(message = "Schedule items is required")
    private DoctorScheduleItemRequest[] scheduleItems;
}
