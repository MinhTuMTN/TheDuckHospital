package com.theduckhospital.api.dto.request.headnurse;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class CreateExamNurseScheduleRequest {
    @NotNull(message = "Nurse ID is required")
    private UUID nurseId;
    @NotBlank(message = "Schedule is required")
    private List<ExamNurseScheduleItemRequest> schedules;
}
