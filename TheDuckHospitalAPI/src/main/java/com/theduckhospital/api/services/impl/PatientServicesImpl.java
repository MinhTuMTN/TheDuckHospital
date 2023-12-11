package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.entity.Patient;
import com.theduckhospital.api.entity.PatientProfile;
import com.theduckhospital.api.repository.PatientProfileRepository;
import com.theduckhospital.api.repository.PatientRepository;
import com.theduckhospital.api.services.IPatientServices;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PatientServicesImpl implements IPatientServices {
    private final PatientRepository patientRepository;
    private final PatientProfileRepository patientProfileRepository;

    public PatientServicesImpl(
            PatientRepository patientRepository,
            PatientProfileRepository patientProfileRepository
    ) {
        this.patientRepository = patientRepository;
        this.patientProfileRepository = patientProfileRepository;
    }

    @Override
    public Patient createPatient(String identityNumber, PatientProfile patientProfile) {
        Optional<Patient> optional = patientRepository
                .findByIdentityNumberAndDeletedIsFalse(identityNumber);

        if (optional.isPresent())
            return optional.get();

        Patient patient = new Patient();
        patient.setIdentityNumber(identityNumber);

        List<PatientProfile> patientProfiles = new ArrayList<>();
        patientProfiles.add(patientProfile);
        patient.setPatientProfiles(patientProfiles);

        patient.setDateOfBirth(patientProfile.getDateOfBirth());
        patient.setFullName(patientProfile.getFullName());
        patient.setPhoneNumber(patientProfile.getPhoneNumber());
        patient.setGender(patientProfile.getGender());
        patient.setDeleted(false);
        patientRepository.save(patient);

        patientProfile.setIdentityNumber(identityNumber);
        patientProfile.setPatient(patient);
        patientProfileRepository.save(patientProfile);

        return patient;
    }
}
