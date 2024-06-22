package com.theduckhospital.api.dto.request.nurse;

import lombok.Data;

@Data
public class UpdateRoomHospitalAdmission {
    private int roomId;
    private String hospitalAdmissionCode;
}
