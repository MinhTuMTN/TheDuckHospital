package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.DateCommon;
import com.theduckhospital.api.constant.HospitalAdmissionState;
import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.dto.request.nurse.UpdateDischargeDetails;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.repository.DischargeRepository;
import com.theduckhospital.api.services.IDischargeServices;
import com.theduckhospital.api.services.IDoctorServices;
import org.springframework.stereotype.Service;

@Service
public class DischargeServicesImpl implements IDischargeServices {
    private final DischargeRepository dischargeRepository;
    private final IDoctorServices doctorServices;

    public DischargeServicesImpl(
            DischargeRepository dischargeRepository,
            IDoctorServices doctorServices) {
        this.dischargeRepository = dischargeRepository;
        this.doctorServices = doctorServices;
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
    public Discharge updateDischargeDetails(
            HospitalAdmission hospitalAdmission,
            UpdateDischargeDetails request,
            Nurse inpatientNurse
    ) {
        Discharge discharge = getDischargeByHospitalAdmission(hospitalAdmission);
        discharge.setDischargeSummary(request.getDischargeSummary());
        discharge.setTreatments(request.getTreatments());
        discharge.setNote(request.getNote());
        discharge.setReExaminationDate(DateCommon.getStarOfDay(
                request.getReExaminationDate()
        ));

        Doctor doctor = doctorServices.getDoctorById(request.getDoctorId());
        discharge.setDoctor(doctor);

        discharge.setNurse(inpatientNurse);
        dischargeRepository.save(discharge);

        return discharge;
    }

    @Override
    public boolean isPaidDischarge(HospitalAdmission hospitalAdmission) {
        Discharge discharge = hospitalAdmission.getDischarge();
        Transaction transaction = discharge.getTransaction();
        return transaction != null
                && transaction.getStatus() == TransactionStatus.SUCCESS
                && hospitalAdmission.getPaidDischargeFee();
    }

    @Override
    public void saveDischarge(Discharge discharge) {
        dischargeRepository.save(discharge);
    }
}
