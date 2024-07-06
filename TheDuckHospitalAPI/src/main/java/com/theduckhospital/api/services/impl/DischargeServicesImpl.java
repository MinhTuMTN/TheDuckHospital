package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.DateCommon;
import com.theduckhospital.api.constant.HospitalAdmissionState;
import com.theduckhospital.api.entity.Discharge;
import com.theduckhospital.api.entity.HospitalAdmission;
import com.theduckhospital.api.repository.DischargeRepository;
import com.theduckhospital.api.services.IDischargeServices;
import com.theduckhospital.api.services.IHospitalAdmissionServices;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DischargeServicesImpl implements IDischargeServices {
    private final DischargeRepository dischargeRepository;

    public DischargeServicesImpl(
            DischargeRepository dischargeRepository
    ) {
        this.dischargeRepository = dischargeRepository;
    }


    @Override
    public Discharge getDischargeByHospitalAdmission(HospitalAdmission hospitalAdmission) {
        Discharge discharge = hospitalAdmission.getDischarge();
        if (discharge != null) {
            if (hospitalAdmission.getState() != HospitalAdmissionState.DISCHARGED) {
                discharge.setDischargeDate(DateCommon.getStarOfDay(DateCommon.getToday()));
                dischargeRepository.save(discharge);
            }
            return discharge;
        }

        discharge = new Discharge();
        discharge.setDischargeDate(DateCommon.getStarOfDay(DateCommon.getToday()));
        discharge.setHospitalAdmission(hospitalAdmission);
        dischargeRepository.save(discharge);

        return discharge;
    }

    @Override
    public void saveDischarge(Discharge discharge) {
        dischargeRepository.save(discharge);
    }
}
