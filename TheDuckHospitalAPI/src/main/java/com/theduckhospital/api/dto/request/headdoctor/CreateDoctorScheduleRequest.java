package com.theduckhospital.api.dto.request.headdoctor;

import com.theduckhospital.api.constant.ScheduleType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class CreateDoctorScheduleRequest {
    @NotNull(message = "Doctor ID is required")
    private UUID doctorId;
    @NotNull(message = "Medical Service ID is required")
    private Integer medicalServiceId;

    @NotNull(message = "Room ID is required")
    private Integer roomId;

    @NotNull(message = "Slot is required")
    private Integer slotPerTimeSlot;

    @NotNull(message = "Schedule type is required")
    private ScheduleType scheduleType;

    private List<Date> morningDates;

    private List<Date> afternoonDates;

    private List<Date> eveningDates;

    private List<Date> nightDates;
}
