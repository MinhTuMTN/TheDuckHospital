package com.theduckhospital.api.dto.request;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class BookingRequest {
    private UUID patientProfileId;
    private List<UUID> doctorScheduleIds;
}
