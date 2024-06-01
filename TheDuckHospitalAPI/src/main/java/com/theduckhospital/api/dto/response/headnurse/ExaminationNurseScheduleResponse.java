package com.theduckhospital.api.dto.response.headnurse;

import com.theduckhospital.api.constant.ScheduleSession;
import com.theduckhospital.api.constant.ScheduleType;
import com.theduckhospital.api.entity.NurseSchedule;
import lombok.Data;

import java.util.UUID;

@Data
public class ExaminationNurseScheduleResponse {
    private UUID nurseScheduleId;
    private UUID nurseId;
    private String nurseName;
    private int dayOfWeek;
    private int roomId;
    private String roomName;
    private ScheduleSession scheduleSession;
    private ScheduleType scheduleType;

    public ExaminationNurseScheduleResponse(NurseSchedule nurseSchedule) {
        this.nurseScheduleId = nurseSchedule.getNurseScheduleId();
        this.nurseId = nurseSchedule.getNurse().getStaffId();
        this.nurseName = nurseSchedule.getNurseName();
        this.dayOfWeek = nurseSchedule.getDayOfWeek();
        this.roomId = nurseSchedule.getRoom().getRoomId();
        this.roomName = nurseSchedule.getRoom().getRoomName();
        this.scheduleSession = nurseSchedule.getScheduleSession();
        this.scheduleType = nurseSchedule.getScheduleType();
    }
}
