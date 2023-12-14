package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Booking;
import com.theduckhospital.api.entity.DoctorSchedule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {
    long countByDoctorScheduleAndDeletedIsFalseAndQueueNumberGreaterThan(
            DoctorSchedule doctorSchedule,
            int queueNumber
    );
    Optional<Booking> findByBookingCodeAndDeletedIsFalse(String bookingCode);
    Page<Booking> findBookingsByDoctorScheduleAndQueueNumberLessThanEqualAndDeletedIsFalseOrderByQueueNumberDesc(
            DoctorSchedule doctorSchedule,
            int queueNumber,
            Pageable pageable

    );
}