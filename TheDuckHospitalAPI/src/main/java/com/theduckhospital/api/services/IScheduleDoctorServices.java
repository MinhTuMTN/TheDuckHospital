package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.headdoctor.CreateDoctorScheduleRequest;
import com.theduckhospital.api.entity.DoctorSchedule;

public interface IScheduleDoctorServices {
    DoctorSchedule createDoctorSchedule(
            String authorization,
            CreateDoctorScheduleRequest doctorSchedule
    );



}
