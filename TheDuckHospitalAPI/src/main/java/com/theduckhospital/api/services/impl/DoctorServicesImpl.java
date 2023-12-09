package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.DoctorRepository;
import com.theduckhospital.api.services.IDoctorServices;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DoctorServicesImpl implements IDoctorServices {
    private final DoctorRepository doctorRepository;

    public DoctorServicesImpl(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @Override
    public boolean deleteHeadDoctor(UUID staffId) {
        Doctor doctor = getDoctorById(staffId);
        doctor.setHeadOfDepartment(false);
        doctorRepository.save(doctor);

        return true;
    }

    @Override
    public Doctor getDoctorById(UUID staffId) {
        Optional<Doctor> optional = doctorRepository.findById(staffId);
        if (optional.isEmpty()) {
            throw new NotFoundException("Doctor not found");
        }

        return optional.get();
    }

    @Override
    public List<Doctor> getDoctorNotInDepartment() {
        return doctorRepository.findByDepartmentIsNull();
    }
}
