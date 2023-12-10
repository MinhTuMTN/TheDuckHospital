package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.dto.response.admin.FilteredPatientsResponse;
import com.theduckhospital.api.dto.response.admin.PatientResponse;
import com.theduckhospital.api.entity.Patient;
import com.theduckhospital.api.entity.Room;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.PatientRepository;
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

    public PatientServicesImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
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
}
