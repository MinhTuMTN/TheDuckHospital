package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.NurseType;
import com.theduckhospital.api.constant.RoomType;
import com.theduckhospital.api.dto.response.PaginationResponse;
import com.theduckhospital.api.dto.response.admin.ActiveDoctorResponse;
import com.theduckhospital.api.dto.response.admin.FilteredActiveDoctorsResponse;
import com.theduckhospital.api.dto.response.headnurse.ActiveNurseResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.AccountRepository;
import com.theduckhospital.api.repository.NurseRepository;
import com.theduckhospital.api.security.JwtTokenProvider;
import com.theduckhospital.api.services.INurseServices;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class NurseServicesImpl implements INurseServices {
    private final NurseRepository nurseRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final AccountRepository accountRepository;
    public NurseServicesImpl(NurseRepository nurseRepository, JwtTokenProvider jwtTokenProvider, AccountRepository accountRepository) {
        this.nurseRepository = nurseRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.accountRepository = accountRepository;
    }

    @Override
    public List<Nurse> getNurseNotInDepartment() {
        return nurseRepository.findByDepartmentIsNull();
    }

    @Override
    public boolean deleteHeadNurse(UUID staffId) {
        Nurse nurse = getNurseById(staffId);
        nurse.setHeadOfDepartment(false);
        nurseRepository.save(nurse);

        return true;
    }

    @Override
    public Nurse getNurseById(UUID staffId) {
        Optional<Nurse> optional = nurseRepository.findById(staffId);
        if (optional.isEmpty()) {
            throw new NotFoundException("Nurse not found");
        }

        return optional.get();
    }

    @Override
    public PaginationResponse getPaginationActiveNursesDepartment(
            String authorization,
            String search,
            NurseType nurseType,
            int page,
            int limit
    ) {
        Nurse headNurse = getNurseByToken(authorization);
        if (!headNurse.isHeadOfDepartment()) {
            throw new RuntimeException("You are not head of department");
        }

        Department department = headNurse.getDepartment();

        Pageable pageable = PageRequest.of(page, limit);
        Page<Nurse> nursePage = nurseRepository
                .findByFullNameContainingAndDepartmentAndNurseTypeAndDeletedIsFalse(
                        search,
                        department,
                        nurseType,
                        pageable
                );

        List<ActiveNurseResponse> responses = new ArrayList<>();

        for (Nurse nurse : nursePage.getContent()) {
            responses.add(new ActiveNurseResponse(nurse));
        }

        return PaginationResponse.builder()
                .items(responses)
                .limit(limit)
                .page(page)
                .totalItems((int) nursePage.getTotalElements())
                .totalPages(nursePage.getTotalPages())
                .build();
    }

    @Override
    public List<Room> getRoomsDepartment(String authorization, RoomType roomType) {
        Nurse headNurse = getNurseByToken(authorization);
        if (!headNurse.isHeadOfDepartment()) {
            throw new RuntimeException("You are not head of department");
        }

        Department department = headNurse.getDepartment();

        return department.getRooms()
                .stream()
                .filter(room -> room.getRoomType() == roomType)
                .toList();
    }

    public Nurse getNurseByToken(String token) {
        token = token.substring(7);

        UUID userId = UUID.fromString(jwtTokenProvider.getUserIdFromJwt(token));
        Account account = accountRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Account not found")
        );
        if (account.isDeleted())
            throw new NotFoundException("Account not found");

        if (account.getStaff() == null)
            throw new NotFoundException("Nurse not found");

        Nurse nurse = nurseRepository.findById(account.getStaff().getStaffId())
                .orElseThrow(() -> new NotFoundException("Nurse not found"));
        if (nurse.isDeleted())
            throw new NotFoundException("Nurse not found");

        return nurse;
    }
}
