package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.nurse.UpdateDischargeDetails;
import com.theduckhospital.api.dto.response.nurse.DischargeDetails;
import com.theduckhospital.api.entity.Discharge;
import com.theduckhospital.api.entity.HospitalAdmission;
import com.theduckhospital.api.entity.Nurse;

import java.util.UUID;

public interface IDischargeServices {
    Discharge getDischargeByHospitalAdmission(HospitalAdmission hospitalAdmission);
    Discharge updateDischargeDetails(
            HospitalAdmission hospitalAdmission,
            UpdateDischargeDetails request,
            Nurse inpatientNurse
    );
    boolean isPaidDischarge(HospitalAdmission hospitalAdmission);
    void saveDischarge(Discharge discharge);
}
