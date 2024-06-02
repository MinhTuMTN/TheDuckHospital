package com.theduckhospital.api.repository;

import com.theduckhospital.api.constant.ScheduleSession;
import com.theduckhospital.api.constant.ScheduleType;
import com.theduckhospital.api.entity.Nurse;
import com.theduckhospital.api.entity.NurseSchedule;
import com.theduckhospital.api.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
                    "AND ns.deleted = false"
    )
    Optional<NurseSchedule> findInpatientAlreadyScheduled(
            Room room,
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
}
