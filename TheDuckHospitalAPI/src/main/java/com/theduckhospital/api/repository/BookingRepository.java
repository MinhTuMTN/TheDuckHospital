package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Booking;
import com.theduckhospital.api.entity.DoctorSchedule;
import com.theduckhospital.api.entity.PatientProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {
    long countByTimeSlot_DoctorScheduleAndDeletedIsFalseAndQueueNumberGreaterThan(
            DoctorSchedule doctorSchedule,
            int queueNumber
    );
    Optional<Booking> findByBookingCodeAndDeletedIsFalse(String bookingCode);
    Page<Booking> findBookingsByTimeSlot_DoctorScheduleAndQueueNumberLessThanEqualAndDeletedIsFalseOrderByQueueNumberDesc(
            DoctorSchedule doctorSchedule,
            int queueNumber,
            Pageable pageable
    );

    @Query("SELECT b FROM Booking b " +
            "WHERE b.patientProfile.patientProfileId = :patientProfileId " +
            "AND b.timeSlot.doctorSchedule.doctorScheduleId = :doctorScheduleId " +
            "AND b.deleted = false "
    )
    Optional<Booking> nurseFindBooking(
            UUID patientProfileId,
            UUID doctorScheduleId
    );

//    @Query("SELECT ds.date, COUNT(b.bookingId) " +
//            "FROM Booking b " +
//            "JOIN b.timeSlot ds " +
//            "WHERE ds.date BETWEEN :startDate AND :endDate " +
//            "GROUP BY ds.date " +
//            "ORDER BY ds.date ASC")
//    List<Object[]> countBookingsByDateRange(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT CAST(b.createdAt AS DATE), COUNT(b) " +
            "FROM Booking b " +
            "WHERE b.createdAt BETWEEN :startDate AND :endDate AND b.deleted = false " +
            "GROUP BY CAST(b.createdAt AS DATE) " +
            "ORDER BY CAST(b.createdAt AS DATE) ASC")
    List<Object[]> countBookingsByCreatedAtBetweenAndDeletedIsFalse(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    Optional<Booking> findByPatientProfileAndTimeSlot_DoctorScheduleAndDeletedIsFalse(
            PatientProfile patientProfile,
            DoctorSchedule doctorSchedule
    );
    @Query("SELECT b FROM Booking b " +
            "JOIN b.timeSlot ds " +
            "WHERE ds.date < :date " +
            "AND b.cancelled = false " +
            "AND b.medicalExaminationRecord IS NULL "
    )
    List<Booking> findExpiredBookings(Date date);
}
