package com.theduckhospital.api.repository;

import com.theduckhospital.api.constant.ScheduleType;
import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.DoctorSchedule;
import com.theduckhospital.api.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DoctorScheduleRepository extends JpaRepository<DoctorSchedule, UUID> {
    Optional<DoctorSchedule> findByRoomAndDateAndScheduleTypeAndDeletedIsFalse(
            Room room,
            Date date,
            ScheduleType scheduleType
    );

    DoctorSchedule findDoctorScheduleByRoomAndDateAndScheduleTypeAndDeletedIsFalse(
            Room room,
            Date date,
            ScheduleType scheduleType
    );

    List<DoctorSchedule> findByRoomAndDateOrderByScheduleType(
            Room room,
            Date date
    );

    Optional<DoctorSchedule> findByDoctorAndDateAndScheduleTypeAndDeletedIsFalse(
            Doctor doctor,
            Date date,
            ScheduleType scheduleType
    );

    List<DoctorSchedule> findByDoctorAndScheduleTypeAndDeletedIsFalse(
            Doctor doctor,
            ScheduleType scheduleType
    );

    List<DoctorSchedule> findByDoctorAndDateOrderByScheduleType(
            Doctor doctor,
            Date date
    );

    List<DoctorSchedule> findByRoomAndScheduleTypeAndDeletedIsFalse(
            Room room,
            ScheduleType scheduleType
    );

    List<DoctorSchedule> findByRoomAndDateAndDeletedIsFalse(
            Room room,
            Date date
    );

    List<DoctorSchedule> findByMedicalService_Department_DepartmentIdAndDateAndDeletedIsFalse(
            int medicalService_department_departmentId,
            Date date
    );

    List<DoctorSchedule> findByDoctorAndDateAndDeletedIsFalse(Doctor doctor, Date date);

    List<DoctorSchedule> findByDateBetween(Date startDate, Date endDate);
    List<DoctorSchedule> findByDoctorAndDateAndDeletedIsFalseOrderByScheduleTypeAsc(Doctor doctor, Date date);
    List<DoctorSchedule> findByDoctorAndDateBetweenAndDeletedIsFalseOrderByDateAscScheduleTypeAsc(
            Doctor doctor, Date date, Date date2
    );
}
