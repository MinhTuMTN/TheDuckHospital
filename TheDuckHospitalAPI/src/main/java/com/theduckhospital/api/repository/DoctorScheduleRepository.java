package com.theduckhospital.api.repository;

import com.theduckhospital.api.constant.ScheduleType;
import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.DoctorSchedule;
import com.theduckhospital.api.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DoctorScheduleRepository extends JpaRepository<DoctorSchedule, UUID> {
    Optional<DoctorSchedule> findByRoomAndDateAndScheduleTypeAndDeletedIsFalse(
            Room room,
            Date date,
            ScheduleType scheduleType
    );

    Optional<DoctorSchedule> findByDoctorAndDateAndScheduleTypeAndDeletedIsFalse(
            Doctor doctor,
            Date date,
            ScheduleType scheduleType
    );
}
