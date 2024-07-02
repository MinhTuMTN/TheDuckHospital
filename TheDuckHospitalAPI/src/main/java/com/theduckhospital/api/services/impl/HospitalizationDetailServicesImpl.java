package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.DateCommon;
import com.theduckhospital.api.dto.request.nurse.UpdateDailyHospitalAdmissionDetails;
import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.HospitalAdmission;
import com.theduckhospital.api.entity.HospitalizationDetail;
import com.theduckhospital.api.entity.Nurse;
import com.theduckhospital.api.repository.HospitalizationDetailRepository;
import com.theduckhospital.api.services.IDoctorServices;
import com.theduckhospital.api.services.IHospitalizationDetailServices;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class HospitalizationDetailServicesImpl implements IHospitalizationDetailServices {
    private final HospitalizationDetailRepository hospitalizationDetailRepository;
    private final IDoctorServices doctorServices;

    public HospitalizationDetailServicesImpl(
            HospitalizationDetailRepository hospitalizationDetailRepository,
            IDoctorServices doctorServices
    ) {
        this.hospitalizationDetailRepository = hospitalizationDetailRepository;
        this.doctorServices = doctorServices;
    }

    @Override
    public HospitalizationDetail updateDailyHospitalAdmissionDetails(
            Nurse nurse,
            HospitalAdmission hospitalAdmission,
            UpdateDailyHospitalAdmissionDetails request
    ) {
        Date hospitalizationDate = DateCommon.getStarOfDay(request.getDate());
        Optional<HospitalizationDetail> optional = hospitalizationDetailRepository
                .findByHospitalAdmissionAndHospitalizationDate(
                        hospitalAdmission,
                        hospitalizationDate
                );

        HospitalizationDetail details = optional.orElseGet(HospitalizationDetail::new);
        details.setHospitalAdmission(hospitalAdmission);
        details.setHospitalizationDate(hospitalizationDate);
        details.setNurse(nurse);
        details.setDiagnosis(request.getDiagnosis());
        details.setDiseaseProgression(request.getDiseaseProgression());
        details.setSymptom(request.getSymptoms());
        details.setTemperature(request.getTemperature());
        details.setBloodPressure(request.getBloodPressure());
        details.setHeartRate(request.getHeartRate());
        details.setHospitalizationDate(hospitalizationDate);

        if (request.getDoctorId() != null) {
            Doctor doctor = doctorServices.getDoctorById(request.getDoctorId());
            details.setTreatingDoctor(doctor);
        }

        hospitalizationDetailRepository.save(details);
        return details;
    }

    @Override
    public HospitalizationDetail getDailyHospitalAdmissionDetails(
            Nurse nurse,
            HospitalAdmission hospitalAdmission,
            Date date
    ) {
        Optional<HospitalizationDetail> optional = hospitalizationDetailRepository
                .findByHospitalAdmissionAndHospitalizationDate(
                        hospitalAdmission,
                        DateCommon.getStarOfDay(date)
                );

        HospitalizationDetail details;
        if (optional.isEmpty()) {
            details = new HospitalizationDetail();
            details.setHospitalAdmission(hospitalAdmission);
            details.setHospitalizationDate(DateCommon.getStarOfDay(date));
            hospitalizationDetailRepository.save(details);
        } else {
            details = optional.get();
        }

        return details;
    }
}
