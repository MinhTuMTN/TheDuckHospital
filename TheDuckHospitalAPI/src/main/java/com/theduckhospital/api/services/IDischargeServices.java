package com.theduckhospital.api.services;

import com.theduckhospital.api.entity.Discharge;
import com.theduckhospital.api.entity.HospitalAdmission;

import java.util.UUID;

public interface IDischargeServices {
    Discharge getDischargeByHospitalAdmission(HospitalAdmission hospitalAdmission);
    void saveDischarge(Discharge discharge);
}
