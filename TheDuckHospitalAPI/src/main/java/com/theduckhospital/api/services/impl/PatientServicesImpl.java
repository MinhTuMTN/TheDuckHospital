package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.dto.response.admin.FilteredPatientsResponse;
import com.theduckhospital.api.dto.response.admin.PatientResponse;
import com.theduckhospital.api.entity.Patient;
import com.theduckhospital.api.entity.PatientProfile;
import com.theduckhospital.api.entity.Room;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.PatientRepository;
import com.theduckhospital.api.repository.PatientProfileRepository;
import com.theduckhospital.api.services.IPatientServices;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PatientServicesImpl implements IPatientServices {
    private final PatientRepository patientRepository;
    private final PatientProfileRepository patientProfileRepository;

    public PatientServicesImpl(
            PatientRepository patientRepository,
            PatientProfileRepository patientProfileRepository) {
        this.patientRepository = patientRepository;
        this.patientProfileRepository = patientProfileRepository;
    }

    @Override
    public FilteredPatientsResponse getPaginationPatientsDeleted(int page, int limit) {
        Pageable pageable = PageRequest.of(page, limit);
        Page<Patient> patientPage = patientRepository.findPaginationByOrderByDeleted(pageable);

        List<PatientResponse> filteredPatients = new ArrayList<>();

        for (Patient patient : patientPage.getContent()) {
            filteredPatients.add(new PatientResponse(patient));
        }

        List<Patient> patients = patientRepository.findAll();

        return new FilteredPatientsResponse(filteredPatients, patients.size(), page, limit);
    }

    @Override
    public PatientResponse getPatientById(UUID patientId) {
        Optional<Patient> optional = patientRepository.findById(patientId);
        if (optional.isEmpty()) {
            throw new NotFoundException("Patient not found");
        }

        Patient patient = optional.get();

        return new PatientResponse(patient);
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