package com.theduckhospital.api.dto.request.headdoctor;

import com.theduckhospital.api.constant.ScheduleType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DoctorScheduleItemRequest {

    @NotNull(message = "Room ID is required")
    private Integer roomId;
    @NotNull(message = "Slot is required")
    private Integer slot;
    @NotNull(message = "Day of week is required")
    private Integer dayOfWeek;
    @NotNull(message = "Schedule type is required")
    private ScheduleType scheduleType;
}
