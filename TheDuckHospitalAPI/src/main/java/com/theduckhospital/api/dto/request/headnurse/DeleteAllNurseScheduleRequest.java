package com.theduckhospital.api.dto.request.headnurse;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class DeleteAllNurseScheduleRequest {
    private List<UUID> scheduleIds;
}
