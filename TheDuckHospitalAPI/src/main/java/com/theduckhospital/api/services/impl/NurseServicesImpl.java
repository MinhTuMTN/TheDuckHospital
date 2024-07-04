package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.*;
import com.theduckhospital.api.dto.request.headnurse.CreateExamNurseScheduleRequest;
import com.theduckhospital.api.dto.request.headnurse.CreateInpatientNurseSchedule;
import com.theduckhospital.api.dto.request.headnurse.ExamNurseScheduleItemRequest;
import com.theduckhospital.api.dto.response.PaginationResponse;
import com.theduckhospital.api.dto.response.headnurse.ActiveNurseResponse;
import com.theduckhospital.api.dto.response.headnurse.DateHasInpatientScheduleResponse;
import com.theduckhospital.api.dto.response.headnurse.ExaminationNurseScheduleResponse;
import com.theduckhospital.api.dto.response.nurse.NurseDoctorScheduleItemResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.AccountRepository;
import com.theduckhospital.api.repository.NurseRepository;
import com.theduckhospital.api.repository.NurseScheduleRepository;
import com.theduckhospital.api.repository.RoomRepository;
import com.theduckhospital.api.security.JwtTokenProvider;
import com.theduckhospital.api.services.INurseServices;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class NurseServicesImpl implements INurseServices {
    private final NurseRepository nurseRepository;
    private final NurseScheduleRepository nurseScheduleRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final AccountRepository accountRepository;
    private final RoomRepository roomRepository;
    public NurseServicesImpl(
            NurseRepository nurseRepository,
            NurseScheduleRepository nurseScheduleRepository, JwtTokenProvider jwtTokenProvider,
            AccountRepository accountRepository,
            RoomRepository roomRepository
    ) {
        this.nurseRepository = nurseRepository;
        this.nurseScheduleRepository = nurseScheduleRepository;
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
        return roomRepository.findByDepartmentAndRoomTypeAndDeletedIsFalse(department, roomType);
//        return department.getRooms()
//                .stream()
//                .filter(room -> room.getRoomType() == roomType)
//                .toList();
    }

    @Override
    public List<ExaminationNurseScheduleResponse> getExaminationRoomSchedules(String authorization, int roomId) {
        Nurse headNurse = getNurseByToken(authorization);
        Room room = getRoomById(roomId, headNurse.getDepartment());
        if (room.getRoomType() != RoomType.EXAMINATION_ROOM) {
            throw new BadRequestException("Room is not examination room");
        }

        List<NurseSchedule> nurseSchedules = nurseScheduleRepository.findByRoomAndScheduleTypeAndDeletedIsFalse(
                room,
                ScheduleType.EXAMINATION
        );
//        List<NurseSchedule> nurseSchedules = room.getNurseSchedules()
//                .stream().filter(nurseSchedule -> !nurseSchedule.isDeleted()
//                        && nurseSchedule.getScheduleType() == ScheduleType.EXAMINATION
//                ).toList();

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

        Nurse nurse = nurseRepository.findById(request.getNurseId())
                .orElseThrow(() -> new NotFoundException("Nurse not found"));
        if (nurse.isDeleted() || nurse.getNurseType() != NurseType.CLINICAL_NURSE) {
            throw new NotFoundException("Nurse not found");
        }
        if (nurse.getDepartment() != headNurse.getDepartment()) {
            throw new BadRequestException("Nurse is not in department");
        }

        List<NurseSchedule> nurseSchedules = new ArrayList<>();
        for (ExamNurseScheduleItemRequest item : request.getSchedules()) {
            NurseSchedule nurseSchedule = createExaminationRoomSchedule(nurse, room, item);
            nurseSchedules.add(nurseSchedule);
        }

        nurseScheduleRepository.saveAll(nurseSchedules);
        return true;
    }

    @Override
    public boolean createInpatientRoomSchedules(String authorization, int roomId, CreateInpatientNurseSchedule request) {
        Nurse headNurse = getNurseByToken(authorization);
        Room room = getRoomById(roomId, headNurse.getDepartment());
        if (room.getRoomType() != RoomType.TREATMENT_ROOM_VIP
                && room.getRoomType() != RoomType.TREATMENT_ROOM_STANDARD
        ) {
            throw new BadRequestException("Room is not treatment room");
        }

        Nurse nurse = nurseRepository.findById(request.getNurseId())
                .orElseThrow(() -> new NotFoundException("Nurse not found"));
        if (nurse.isDeleted() || nurse.getNurseType() != NurseType.INPATIENT_NURSE) {
            throw new NotFoundException("Nurse not found");
        }
        if (nurse.getDepartment() != headNurse.getDepartment()) {
            throw new BadRequestException("Nurse is not in department");
        }

        List<NurseSchedule> nurseSchedules = new ArrayList<>();
        for (Date date : request.getMorningDates()) {
            NurseSchedule nurseSchedule = createInpatientNurseSchedule(nurse, room, date, ScheduleSession.MORNING);
            nurseSchedules.add(nurseSchedule);
        }

        for (Date date : request.getAfternoonDates()) {
            NurseSchedule nurseSchedule = createInpatientNurseSchedule(nurse, room, date, ScheduleSession.AFTERNOON);
            nurseSchedules.add(nurseSchedule);
        }

        for (Date date : request.getEveningDates()) {
            NurseSchedule nurseSchedule = createInpatientNurseSchedule(nurse, room, date, ScheduleSession.EVENING);
            nurseSchedules.add(nurseSchedule);
        }

        for (Date date : request.getNightDates()) {
            NurseSchedule nurseSchedule = createInpatientNurseSchedule(nurse, room, date, ScheduleSession.NIGHT);
            nurseSchedules.add(nurseSchedule);
        }

        nurseScheduleRepository.saveAll(nurseSchedules);
        return true;
    }

    @Override
    public List<NurseSchedule> getNurseSchedules(String authorization, Integer month, Integer year) {
        Nurse nurse = getNurseByToken(authorization);

        if (nurse.getNurseType() == NurseType.CLINICAL_NURSE) {
            return nurse.getNurseSchedules();
        } else if (nurse.getNurseType() == NurseType.INPATIENT_NURSE) {
            if (month == null || year == null) {
                throw new BadRequestException("Month and year are required");
            }

            return nurseScheduleRepository
                    .findInpatientNurseSchedule(
                            nurse,
                            month,
                            year,
                            ScheduleType.INPATIENT_EXAMINATION
                    );
        }
        return new ArrayList<>();
    }

    @Override
    public DateHasInpatientScheduleResponse getInpatientRoomSchedules(
            String authorization,
            UUID nurseId,
            int roomId,
            int month,
            int year
    ) {
        Nurse headNurse = getNurseByToken(authorization);

        Nurse nurse = nurseRepository.findById(nurseId)
                .orElseThrow(() -> new NotFoundException("Nurse not found"));
        if (nurse.isDeleted() || nurse.getDepartment() != headNurse.getDepartment()) {
            throw new NotFoundException("Nurse not found");
        }
        if (nurse.getNurseType() != NurseType.INPATIENT_NURSE) {
            throw new BadRequestException("Nurse is not inpatient nurse");
        }

        Room room = getRoomById(roomId, nurse.getDepartment());
        if (room.getRoomType() != RoomType.TREATMENT_ROOM_VIP
                && room.getRoomType() != RoomType.TREATMENT_ROOM_STANDARD
        ) {
            throw new BadRequestException("Room is not treatment room");
        }

        List<Date> morning = nurseScheduleRepository
                .findInpatientScheduleAlreadyScheduled(
                        room,
                        nurse,
                        month,
                        year,
                        ScheduleSession.MORNING,
                        ScheduleType.INPATIENT_EXAMINATION
                ).stream().map(NurseSchedule::getDate).toList();

        List<Date> afternoon = nurseScheduleRepository
                .findInpatientScheduleAlreadyScheduled(
                        room,
                        nurse,
                        month,
                        year,
                        ScheduleSession.AFTERNOON,
                        ScheduleType.INPATIENT_EXAMINATION
                ).stream().map(NurseSchedule::getDate).toList();

        List<Date> evening = nurseScheduleRepository
                .findInpatientScheduleAlreadyScheduled(
                        room,
                        nurse,
                        month,
                        year,
                        ScheduleSession.EVENING,
                        ScheduleType.INPATIENT_EXAMINATION
                ).stream().map(NurseSchedule::getDate).toList();

        List<Date> night = nurseScheduleRepository
                .findInpatientScheduleAlreadyScheduled(
                        room,
                        nurse,
                        month,
                        year,
                        ScheduleSession.NIGHT,
                        ScheduleType.INPATIENT_EXAMINATION
                ).stream().map(NurseSchedule::getDate).toList();

        return DateHasInpatientScheduleResponse.builder()
                .morning(morning)
                .afternoon(afternoon)
                .evening(evening)
                .night(night)
                .build();
    }

    @Override
    public List<NurseSchedule> getInpatientRoomSchedulesByWeek(
            String authorization,
            int roomId,
            Integer week,
            Integer year,
            String name,
            List<ScheduleSession> scheduleSessions
    ) {
        if (scheduleSessions == null || scheduleSessions.isEmpty()) {
            scheduleSessions = List.of(
                    ScheduleSession.MORNING,
                    ScheduleSession.AFTERNOON,
                    ScheduleSession.EVENING,
                    ScheduleSession.NIGHT
            );
        }
        Map<String, Date> startAndEndOfWeek = DateCommon.getStartAndEndOfWeek(week, year);

        Date startOfWeek = startAndEndOfWeek.get("startOfWeek");
        Date endOfWeek = startAndEndOfWeek.get("endOfWeek");

        Room room = getRoomById(roomId, getNurseByToken(authorization).getDepartment());
        if (room.getRoomType() != RoomType.TREATMENT_ROOM_VIP
                && room.getRoomType() != RoomType.TREATMENT_ROOM_STANDARD
        ) {
            throw new BadRequestException("Room is not treatment room");
        }
        return nurseScheduleRepository
                .findInpatientScheduleByWeek(
                        room,
                        startOfWeek,
                        endOfWeek,
                        ScheduleType.INPATIENT_EXAMINATION,
                        name,
                        scheduleSessions
                );
    }

    @Override
    public List<NurseDoctorScheduleItemResponse> getTodayExaminationSchedules(String authorization) {
        Date today = DateCommon.getToday();
        Nurse nurse = getNurseByToken(authorization);
        List<DoctorSchedule> doctorSchedules = nurseScheduleRepository
                .findTodayExaminationSchedules(
                        nurse,
                        DateCommon.getCalendar(today).get(Calendar.DAY_OF_WEEK),
                        today,
                        ScheduleType.EXAMINATION
                );

        List<NurseDoctorScheduleItemResponse> responses = new ArrayList<>();
        for (DoctorSchedule doctorSchedule : doctorSchedules) {
            responses.add(new NurseDoctorScheduleItemResponse(doctorSchedule));
        }

        return responses;
    }

    @Override
    public boolean deleteExaminationRoomSchedule(String authorization, UUID scheduleId) {
        Nurse nurse = getNurseByToken(authorization);
        Optional<NurseSchedule> optional = nurseScheduleRepository
                .findByNurseScheduleId(scheduleId);

        if (optional.isEmpty() || optional.get().getNurse().getDepartment() != nurse.getDepartment()) {
            throw new NotFoundException("Schedule not found");
        }

        NurseSchedule nurseSchedule = optional.get();
        nurseScheduleRepository.delete(nurseSchedule);

        return true;
    }

    private NurseSchedule createExaminationRoomSchedule(Nurse nurse, Room room, ExamNurseScheduleItemRequest item) {
        // Check nurse is available
        // Find by nurse, dayOfWeek, session
        Optional<NurseSchedule> optionalNurseCheck = nurseScheduleRepository
                .findAvailableNurseSchedule(
                        nurse,
                        item.getDayOfWeek(),
                        item.getSession(),
                        ScheduleType.EXAMINATION
                );
        if (optionalNurseCheck.isPresent()) {
            throw new BadRequestException("Nurse is not available-" + optionalNurseCheck.get().getRoom().getRoomName());
        }

        // Check room is not scheduled yet
        // Find by room, dayOfWeek, session
        Optional<NurseSchedule> optionalRoomCheck = nurseScheduleRepository
                .findAvailableRoomSchedule(
                        room,
                        item.getDayOfWeek(),
                        item.getSession(),
                        ScheduleType.EXAMINATION
                );
        if (optionalRoomCheck.isPresent()) {
            throw new BadRequestException("Room is not available");
        }

        NurseSchedule nurseSchedule = new NurseSchedule();
        nurseSchedule.setNurse(nurse);
        nurseSchedule.setNurseName(nurse.getFullName());
        nurseSchedule.setRoom(room);
        nurseSchedule.setRoomName(room.getRoomName());
        nurseSchedule.setScheduleType(ScheduleType.EXAMINATION);
        nurseSchedule.setScheduleSession(item.getSession());
        nurseSchedule.setDayOfWeek(item.getDayOfWeek());
        nurseSchedule.setDeleted(false);

        return nurseSchedule;
    }

    private NurseSchedule createInpatientNurseSchedule(Nurse nurse, Room room, Date date, ScheduleSession session) {
        // Check already scheduled
        // Find by nurse, date, room, session
        date = DateCommon.getStarOfDay(date);

        Optional<NurseSchedule> optional = nurseScheduleRepository
                .findInpatientAlreadyScheduled(
                        room,
                        date,
                        nurse,
                        session,
                        ScheduleType.INPATIENT_EXAMINATION
                );
        if (optional.isPresent()) {
            throw new BadRequestException("Already scheduled");
        }

        NurseSchedule nurseSchedule = new NurseSchedule();
        nurseSchedule.setNurse(nurse);
        nurseSchedule.setNurseName(nurse.getFullName());
        nurseSchedule.setRoom(room);
        nurseSchedule.setRoomName(room.getRoomName());
        nurseSchedule.setScheduleType(ScheduleType.INPATIENT_EXAMINATION);
        nurseSchedule.setScheduleSession(session);
        nurseSchedule.setDate(date);
        nurseSchedule.setDeleted(false);

        return nurseSchedule;
    }

    @Override
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

    @Override
    public boolean deleteAllNurseSchedule(String authorization, List<UUID> scheduleIds) {
        Nurse headNurse = getNurseByToken(authorization);
        List<NurseSchedule> nurseSchedules = nurseScheduleRepository
                .findByNurseScheduleIdInAndNurse_DepartmentAndScheduleTypeAndDateGreaterThanEqual(
                        scheduleIds,
                        headNurse.getDepartment(),
                        ScheduleType.INPATIENT_EXAMINATION,
                        DateCommon.getStarOfDay(new Date())
                );

        nurseScheduleRepository.deleteAll(nurseSchedules);
        return true;
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
