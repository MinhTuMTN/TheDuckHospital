package com.theduckhospital.api.dto.request.headnurse;

import com.theduckhospital.api.constant.ScheduleSession;
import lombok.Data;

@Data
public class ExamNurseScheduleItemRequest {
    private int dayOfWeek;
    private ScheduleSession session;
}
