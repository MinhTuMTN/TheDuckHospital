package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.NurseType;
import com.theduckhospital.api.constant.RoomType;
import com.theduckhospital.api.constant.ScheduleType;
import com.theduckhospital.api.dto.request.headnurse.CreateExamNurseScheduleRequest;
import com.theduckhospital.api.dto.request.headnurse.ExamNurseScheduleItemRequest;
import com.theduckhospital.api.dto.response.PaginationResponse;
import com.theduckhospital.api.dto.response.headnurse.ActiveNurseResponse;
import com.theduckhospital.api.dto.response.headnurse.ExaminationNurseScheduleResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.AccountRepository;
import com.theduckhospital.api.repository.NurseRepository;
import com.theduckhospital.api.repository.RoomRepository;
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
    private final RoomRepository roomRepository;
    public NurseServicesImpl(
            NurseRepository nurseRepository,
            JwtTokenProvider jwtTokenProvider,
            AccountRepository accountRepository,
            RoomRepository roomRepository
    ) {
        this.nurseRepository = nurseRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.accountRepository = accountRepository;
        this.roomRepository = roomRepository;
    }

    @Override
    public List<Nurse> getNursesNotInDepartment() {
        return nurseRepository.findByDepartmentIsNullAndNurseTypeIsNotNull();
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
        Department department = headNurse.getDepartment();

        return department.getRooms()
                .stream()
                .filter(room -> room.getRoomType() == roomType)
                .toList();
    }

    @Override
    public List<ExaminationNurseScheduleResponse> getExaminationRoomSchedules(String authorization, int roomId) {
        Nurse headNurse = getNurseByToken(authorization);
        Room room = getRoomById(roomId, headNurse.getDepartment());
        if (room.getRoomType() != RoomType.EXAMINATION_ROOM) {
            throw new BadRequestException("Room is not examination room");
        }

        List<NurseSchedule> nurseSchedules = room.getNurseSchedules()
                .stream().filter(nurseSchedule -> !nurseSchedule.isDeleted()
                        && nurseSchedule.getScheduleType() == ScheduleType.EXAMINATION
                ).toList();

        List<ExaminationNurseScheduleResponse> responses = new ArrayList<>();
        for (NurseSchedule nurseSchedule : nurseSchedules) {
            responses.add(new ExaminationNurseScheduleResponse(nurseSchedule));
        }

        return responses;
    }

    @Override
    public boolean createExaminationRoomSchedules(
            String authorization,
            int roomId,
            CreateExamNurseScheduleRequest request
    ) {
        Nurse headNurse = getNurseByToken(authorization);
        Room room = getRoomById(roomId, headNurse.getDepartment());
        if (room.getRoomType() != RoomType.EXAMINATION_ROOM) {
            throw new BadRequestException("Room is not examination room");
        }

        for (ExamNurseScheduleItemRequest item : request.getSchedules()) {
            Nurse nurse = nurseRepository.findById(request.getNurseId())
                    .orElseThrow(() -> new NotFoundException("Nurse not found"));
            if (nurse.isDeleted()) {
                throw new NotFoundException("Nurse not found");
            }

            NurseSchedule nurseSchedule = new NurseSchedule();
            nurseSchedule.setNurse(nurse);
            nurseSchedule.setNurseName(nurse.getFullName());
            nurseSchedule.setRoom(room);
            nurseSchedule.setScheduleType(ScheduleType.EXAMINATION);
            nurseSchedule.setScheduleSession(item.getSession());
            nurseSchedule.setDayOfWeek(item.getDayOfWeek());
            nurseSchedule.setDeleted(false);

            room.getNurseSchedules().add(nurseSchedule);
        }

        roomRepository.save(room);

        return true;
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

    private Room getRoomById(int roomId, Department department) {
        Optional<Room> optional = roomRepository
                .findRoomByRoomIdAndDepartmentAndDeletedIsFalse(
                        roomId,
                        department
                );
        if (optional.isEmpty()) {
            throw new NotFoundException("Room not found");
        }

        return optional.get();
    }
}
