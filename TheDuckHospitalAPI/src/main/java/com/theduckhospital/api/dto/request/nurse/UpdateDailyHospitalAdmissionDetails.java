package com.theduckhospital.api.dto.request.nurse;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class UpdateDailyHospitalAdmissionDetails {
    private Date date;
    private String symptoms;
    private String diseaseProgression;
    private String diagnosis;
    private String temperature;
    private String bloodPressure;
    private String heartRate;
    private UUID doctorId;
}
