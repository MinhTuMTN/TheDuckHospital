package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.dto.response.admin.FilteredPatientsResponse;
import com.theduckhospital.api.dto.response.admin.PatientResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.PatientProfileRepository;
import com.theduckhospital.api.repository.PatientRepository;
import com.theduckhospital.api.services.IPatientServices;
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
            PatientProfileRepository patientProfileRepository
    ) {
        this.patientRepository = patientRepository;
        this.patientProfileRepository = patientProfileRepository;
    }

    @Override
    public Patient createPatient(String identityNumber, PatientProfile patientProfile) {
        if (identityNumber != null && !identityNumber.isEmpty()) {
            Optional<Patient> optional = patientRepository
                    .findByIdentityNumberAndDeletedIsFalse(identityNumber);

            if (optional.isPresent())
                return optional.get();
        }

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

    @Override
    public Patient findPatientByIdentityNumber(String identityNumber) {
        return patientRepository
                .findByIdentityNumberAndDeletedIsFalse(identityNumber)
                .orElse(null);
    }

    @Override
    public FilteredPatientsResponse getPaginationFilteredPatients(
            String search,
            int page,
            int limit
    ) {
        List<Patient> patients = patientRepository.
                findFullTextSearchByFullNameOrPhoneNumberContainingOrIdentityNumberContaining(search, search, search);

        Pageable pageable = PageRequest.of(page, limit);

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), patients.size());
        List<Patient> pageContent = patients.subList(start, end);

        List<PatientResponse> response = new ArrayList<>();
        for (Patient patient : pageContent) {
            response.add(new PatientResponse(patient));
        }

        return new FilteredPatientsResponse(response, patients.size(), page, limit);
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
    public Patient findPatientByPatientCode(String patientCode) {
        return patientRepository.findPatientByPatientCodeAndDeletedIsFalse(
                patientCode
        ).orElseThrow(() -> new NotFoundException("Can't find Patient"));
    }

}
