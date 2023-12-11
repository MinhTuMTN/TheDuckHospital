package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.headdoctor.CreateDoctorScheduleRequest;
import com.theduckhospital.api.entity.DoctorSchedule;

import java.text.ParseException;
import java.util.List;
import java.util.UUID;

public interface IScheduleDoctorServices {
    List<DoctorSchedule> createDoctorSchedule(
            String authorization,
            CreateDoctorScheduleRequest doctorSchedule
    ) throws ParseException;


    DoctorSchedule getDoctorScheduleByIdForBooking(UUID doctorScheduleId);
}
