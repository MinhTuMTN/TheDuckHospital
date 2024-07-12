package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.entity.*;
import lombok.Data;

@Data
public class DischargeResponse {
    private Discharge dischargeDetail;
    private Doctor doctor;
    private Nurse nurse;

    public DischargeResponse(Discharge dischargeDetail) {
        this.dischargeDetail = dischargeDetail;
        this.doctor = dischargeDetail.getDoctor();
        this.nurse = dischargeDetail.getNurse();
    }
}
