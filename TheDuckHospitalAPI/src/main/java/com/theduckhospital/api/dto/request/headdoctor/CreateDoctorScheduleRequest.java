package com.theduckhospital.api.dto.request.headdoctor;

import com.theduckhospital.api.constant.ScheduleType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class CreateDoctorScheduleRequest {
    @NotNull(message = "Doctor ID is required")
    private UUID doctorId;
    @NotNull(message = "Room ID is required")
    private Integer roomId;
    @NotNull(message = "Medical Service ID is required")
    private Integer medicalServiceId;
    @NotNull(message = "Slot is required")
    private Integer slot;
    @NotNull(message = "Day of week is required")
    private Integer dayOfWeek;
    @NotNull(message = "Schedule type is required")
    private ScheduleType scheduleType;
}
