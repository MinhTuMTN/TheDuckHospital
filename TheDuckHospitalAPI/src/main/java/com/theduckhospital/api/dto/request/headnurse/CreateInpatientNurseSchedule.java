package com.theduckhospital.api.dto.request.headnurse;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class CreateInpatientNurseSchedule {
    @NotNull(message = "Nurse ID is required")
    private UUID nurseId;
    @NotNull(message = "Room ID is required")
    private Integer roomId;
    private List<Date> morningDates;
    private List<Date> afternoonDates;
    private List<Date> eveningDates;
    private List<Date> nightDates;
}