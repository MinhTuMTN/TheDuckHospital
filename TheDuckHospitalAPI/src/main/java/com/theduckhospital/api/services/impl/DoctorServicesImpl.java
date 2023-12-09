package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.AccountRepository;
import com.theduckhospital.api.repository.DoctorRepository;
import com.theduckhospital.api.security.JwtTokenProvider;
import com.theduckhospital.api.services.IDoctorServices;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DoctorServicesImpl implements IDoctorServices {
    private final DoctorRepository doctorRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final AccountRepository accountRepository;

    public DoctorServicesImpl(
            DoctorRepository doctorRepository,
            JwtTokenProvider jwtTokenProvider,
            AccountRepository accountRepository) {
        this.doctorRepository = doctorRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.accountRepository = accountRepository;
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
    
    public Doctor getDoctorByToken(String token) {
        // Remove "Bearer " from token
        token = token.substring(7);

        UUID userId = UUID.fromString(jwtTokenProvider.getUserIdFromJwt(token));
        Account account = accountRepository.findById(userId).orElseThrow(() -> new NotFoundException("Account not found"));
        if (account.isDeleted())
            throw new NotFoundException("Account not found");

        if (account.getStaff() == null)
            throw new NotFoundException("Doctor not found");

        Doctor doctor = doctorRepository.findById(account.getStaff().getStaffId())
                .orElseThrow(() -> new NotFoundException("Doctor not found"));
        if (doctor.isDeleted())
            throw new NotFoundException("Doctor not found");

        return doctor;
    }
}
