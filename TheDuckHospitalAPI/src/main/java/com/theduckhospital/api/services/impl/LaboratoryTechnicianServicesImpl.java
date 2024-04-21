package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.AccountRepository;
import com.theduckhospital.api.repository.DoctorRepository;
import com.theduckhospital.api.repository.LaboratoryTechnicianRepository;
import com.theduckhospital.api.security.JwtTokenProvider;
import com.theduckhospital.api.services.ILaboratoryTechnicianServices;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class LaboratoryTechnicianServicesImpl implements ILaboratoryTechnicianServices {
    private final JwtTokenProvider jwtTokenProvider;
    private final AccountRepository accountRepository;
    private final LaboratoryTechnicianRepository laboratoryTechnicianRepository;

    public LaboratoryTechnicianServicesImpl(
            JwtTokenProvider jwtTokenProvider,
            AccountRepository accountRepository,
            LaboratoryTechnicianRepository laboratoryTechnicianRepository
    ) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.accountRepository = accountRepository;
        this.laboratoryTechnicianRepository = laboratoryTechnicianRepository;
    }

    public LaboratoryTechnician getLaboratoryTechnicianByToken(String token) {
        // Remove "Bearer " from token
        token = token.substring(7);

        UUID userId = UUID.fromString(jwtTokenProvider.getUserIdFromJwt(token));
        Account account = accountRepository.findById(userId).orElseThrow(() -> new NotFoundException("Account not found"));
        if (account.isDeleted())
            throw new NotFoundException("Account not found");

        if (account.getStaff() == null)
            throw new NotFoundException("Laboratory Technician not found");

        LaboratoryTechnician laboratoryTechnician = laboratoryTechnicianRepository.findById(account.getStaff().getStaffId())
                .orElseThrow(() -> new NotFoundException("Laboratory Technician not found"));
        if (laboratoryTechnician.isDeleted())
            throw new NotFoundException("Laboratory Technician not found");

        return laboratoryTechnician;
    }
}
