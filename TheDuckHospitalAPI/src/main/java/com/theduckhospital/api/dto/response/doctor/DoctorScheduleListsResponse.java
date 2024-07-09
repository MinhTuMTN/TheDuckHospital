package com.theduckhospital.api.dto.response.doctor;

import com.theduckhospital.api.constant.ScheduleSession;
import com.theduckhospital.api.entity.DoctorSchedule;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class DoctorScheduleListsResponse {
    private List<DoctorScheduleItemResponse> schedule;
    private List<DoctorScheduleItemResponse> examinationSchedule;
    private List<DoctorScheduleItemResponse> inpatientExaminationSchedule;

    public DoctorScheduleListsResponse(
            List<DoctorScheduleItemResponse> schedule,
            List<DoctorScheduleItemResponse> examinationSchedule,
            List<DoctorScheduleItemResponse> inpatientExaminationSchedule
    ) {
        this.schedule = schedule;
        this.examinationSchedule = examinationSchedule;
        this.inpatientExaminationSchedule = inpatientExaminationSchedule;
    }
}
