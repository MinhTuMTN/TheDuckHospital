package com.theduckhospital.api.dto.request.nurse;

import lombok.Data;

import java.util.UUID;

@Data
public class NurseCreateBookingRequest {
    private UUID patientProfileId;
    private UUID doctorScheduleId;
}
