package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.DateCommon;
import com.theduckhospital.api.dto.request.nurse.UpdateDailyHospitalAdmissionDetails;
import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.HospitalAdmission;
import com.theduckhospital.api.entity.HospitalizationDetail;
import com.theduckhospital.api.entity.Nurse;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.repository.HospitalizationDetailRepository;
import com.theduckhospital.api.services.IDoctorServices;
import com.theduckhospital.api.services.IHospitalizationDetailServices;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@Service
public class HospitalizationDetailServicesImpl implements IHospitalizationDetailServices {
    private final HospitalizationDetailRepository hospitalizationDetailRepository;
    private final IDoctorServices doctorServices;
    private final Map<String, Lock> lockMap;

    public HospitalizationDetailServicesImpl(
            HospitalizationDetailRepository hospitalizationDetailRepository,
            IDoctorServices doctorServices
    ) {
        this.hospitalizationDetailRepository = hospitalizationDetailRepository;
        this.doctorServices = doctorServices;
        this.lockMap = new ConcurrentHashMap<>();
    }

    private String getLockKey(HospitalAdmission hospitalAdmission, Date date) {
        date = DateCommon.getStarOfDay(date);
        return hospitalAdmission.getHospitalAdmissionId().toString() + "_" + date.getTime();
    }

    private Lock getLock(HospitalAdmission hospitalAdmission, Date date) {
        String key = getLockKey(hospitalAdmission, date);
        return lockMap.computeIfAbsent(key, k -> new ReentrantLock());
    }

    @Override
    public HospitalizationDetail updateDailyHospitalAdmissionDetails(
            Nurse nurse,
            HospitalAdmission hospitalAdmission,
            UpdateDailyHospitalAdmissionDetails request
    ) {
        Date hospitalizationDate = DateCommon.getStarOfDay(request.getDate());
        if (DateCommon.isNotTodayOrYesterday(
                hospitalizationDate
        )) {
            throw new BadRequestException("Invalid date");
        }

        Optional<HospitalizationDetail> optional = hospitalizationDetailRepository
                .findByHospitalAdmissionAndHospitalizationDate(
                        hospitalAdmission,
                        hospitalizationDate
                );
        if (optional.isEmpty()) {
            return null;
        }

        HospitalizationDetail details = optional.get();
        details.setHospitalAdmission(hospitalAdmission);
        details.setHospitalizationDate(hospitalizationDate);
        details.setNurse(nurse);
        details.setDiagnosis(request.getDiagnosis());
        details.setDiseaseProgression(request.getDiseaseProgression());
        details.setSymptom(request.getSymptom());
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
        Lock lock = getLock(hospitalAdmission, date);
        lock.lock();
        try {
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
                details.setTreatmentMedicines(new ArrayList<>());
                hospitalizationDetailRepository.save(details);
            } else {
                details = optional.get();
            }

            return details;
        } finally {
            lock.unlock();
        }
    }

    @Override
    public HospitalizationDetail getDailyHospitalAdmissionDetailsOrNull(
            Nurse nurse,
            HospitalAdmission hospitalAdmission,
            Date date
    ) {
        Lock lock = getLock(hospitalAdmission, date);
        lock.lock();
        try {
            Optional<HospitalizationDetail> optional = hospitalizationDetailRepository
                    .findByHospitalAdmissionAndHospitalizationDate(
                            hospitalAdmission,
                            DateCommon.getStarOfDay(date)
                    );

            return optional.orElse(null);
        } finally {
            lock.unlock();
        }
    }
}
