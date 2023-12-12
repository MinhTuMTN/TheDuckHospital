package com.theduckhospital.api.dto.response.nurse;

import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.DoctorSchedule;
import com.theduckhospital.api.entity.Room;
import lombok.Data;

@Data
public class NurseDoctorScheduleItemResponse {
    private DoctorSchedule doctorSchedule;
    private Room room;
    private Department department;
    private Doctor doctor;

    public NurseDoctorScheduleItemResponse(DoctorSchedule doctorSchedule) {
        this.doctorSchedule = doctorSchedule;
        this.room = doctorSchedule.getRoom();
        this.department = doctorSchedule.getRoom().getDepartment();
        this.doctor = doctorSchedule.getDoctor();
    }
}
