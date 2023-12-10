package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Booking;
import com.theduckhospital.api.entity.DoctorSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, String> {
    long countByDoctorScheduleAndDeletedIsFalseAndQueueNumberGreaterThan(
            DoctorSchedule doctorSchedule,
            int queueNumber
    );
}
