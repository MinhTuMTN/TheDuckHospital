package com.theduckhospital.api.dto.response.headnurse;

import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class DateHasInpatientScheduleResponse {
    private List<Date> morning;
    private List<Date> afternoon;
    private List<Date> evening;
    private List<Date> night;
}
