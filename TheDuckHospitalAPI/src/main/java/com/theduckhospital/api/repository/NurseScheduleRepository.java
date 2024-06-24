package com.theduckhospital.api.repository;

import com.theduckhospital.api.constant.ScheduleSession;
import com.theduckhospital.api.constant.ScheduleType;
import com.theduckhospital.api.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface NurseScheduleRepository extends JpaRepository<NurseSchedule, UUID> {
    @Query(
            value = "SELECT ns FROM NurseSchedule ns " +
                    "WHERE ns.nurse = :nurse " +
                    "AND ns.dayOfWeek = :dayOfWeek " +
                    "AND ns.scheduleSession = :scheduleSession " +
                    "AND ns.scheduleType = :scheduleType " +
                    "AND ns.deleted = false"
    )
    Optional<NurseSchedule> findAvailableNurseSchedule(
            Nurse nurse,
            int dayOfWeek,
            ScheduleSession scheduleSession,
            ScheduleType scheduleType
    );

    @Query(
            value = "SELECT ns FROM NurseSchedule ns " +
                    "WHERE ns.room = :room " +
                    "AND ns.dayOfWeek = :dayOfWeek " +
                    "AND ns.scheduleSession = :scheduleSession " +
                    "AND ns.scheduleType = :scheduleType " +
                    "AND ns.deleted = false"
    )
    Optional<NurseSchedule> findAvailableRoomSchedule(
            Room room,
            int dayOfWeek,
            ScheduleSession scheduleSession,
            ScheduleType scheduleType
    );

    @Query(
            value = "SELECT ns FROM NurseSchedule ns " +
                    "WHERE ns.room = :room " +
                    "AND ns.nurse = :nurse " +
                    "AND ns.scheduleSession = :scheduleSession " +
                    "AND ns.scheduleType = :scheduleType " +
                    "AND ns.date = :date " +
                    "AND ns.deleted = false"
    )
    Optional<NurseSchedule> findInpatientAlreadyScheduled(
            Room room,
            Date date,
            Nurse nurse,
            ScheduleSession scheduleSession,
            ScheduleType scheduleType
    );

    @Query(
            value = "SELECT ns FROM NurseSchedule ns " +
                    "WHERE ns.room = :room " +
                    "AND ns.nurse = :nurse " +
                    "AND EXTRACT(MONTH FROM ns.date) = :month " +
                    "AND EXTRACT(YEAR FROM ns.date) = :year " +
                    "AND ns.scheduleSession = :scheduleSession " +
                    "AND ns.scheduleType = :scheduleType " +
                    "AND ns.deleted = false"
    )
    List<NurseSchedule> findInpatientScheduleAlreadyScheduled(
            Room room,
            Nurse nurse,
            int month,
            int year,
            ScheduleSession scheduleSession,
            ScheduleType scheduleType
    );

    @Query(
            value = "SELECT ns FROM NurseSchedule ns " +
                    "WHERE ns.room = :room " +
                    "AND ns.nurse.fullName LIKE %:name% " +
                    "AND ns.scheduleSession IN :scheduleSessions " +
                    "AND ns.date BETWEEN :startDate AND :endDate " +
                    "AND ns.scheduleType = :scheduleType " +
                    "AND ns.deleted = false"
    )
    List<NurseSchedule> findInpatientScheduleByWeek(
            Room room,
            Date startDate,
            Date endDate,
            ScheduleType scheduleType,
            String name,
            List<ScheduleSession> scheduleSessions
    );

    @Query(
            value = "SELECT ns FROM NurseSchedule ns " +
                    "WHERE ns.nurse = :nurse " +
                    "AND EXTRACT(MONTH FROM ns.date) = :month " +
                    "AND EXTRACT(YEAR FROM ns.date) = :year " +
                    "AND ns.scheduleType = :scheduleType " +
                    "AND ns.deleted = false"
    )
    List<NurseSchedule> findInpatientNurseSchedule(
            Nurse nurse,
            int month,
            int year,
            ScheduleType scheduleType
    );

    @Query(
            value = "SELECT ds FROM NurseSchedule ns, DoctorSchedule ds "+
                    "WHERE ns.nurse = :nurse " +
                    "AND ns.dayOfWeek = :dayOfWeek " +
                    "AND ds.date = :date " +
                    "AND ns.scheduleSession = ds.scheduleSession " +
                    "AND ns.room = ds.room " +
                    "AND ns.scheduleType = :scheduleType " +
                    "AND ns.deleted = false"
    )
    List<DoctorSchedule> findTodayExaminationSchedules(
            Nurse nurse,
            int dayOfWeek,
            Date date,
            ScheduleType scheduleType
    );

    Optional<NurseSchedule> findByNurseScheduleId(UUID nurseScheduleId);
    List<NurseSchedule> findByNurseScheduleIdInAndNurse_DepartmentAndScheduleTypeAndDateGreaterThanEqual(
            Collection<UUID> nurseScheduleId,
            Department nurse_department,
            ScheduleType scheduleType,
            Date date
    );

    List<NurseSchedule> findByNurseAndDateAndScheduleTypeAndDeletedIsFalse(
            Nurse nurse,
            Date date,
            ScheduleType scheduleType
    );

    List<NurseSchedule> findByRoomAndScheduleTypeAndDeletedIsFalse(Room room, ScheduleType scheduleType);
}
