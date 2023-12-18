package com.theduckhospital.api.repository;

import com.theduckhospital.api.constant.MedicalExamState;
import com.theduckhospital.api.entity.DoctorSchedule;
import com.theduckhospital.api.entity.MedicalExaminationRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MedicalExaminationRepository
        extends JpaRepository<MedicalExaminationRecord, UUID> {
    Optional<MedicalExaminationRecord> findByBooking_BookingCodeAndDeletedIsFalse(
            String booking_bookingCode
    );

    Page<MedicalExaminationRecord> findByDoctorScheduleAndDeletedIsFalseAndPatientProfile_FullNameContainingIgnoreCaseAndState(
            DoctorSchedule doctorSchedule,
            String patientProfile_fullName,
            MedicalExamState state,
            Pageable pageable);

    long countByDoctorScheduleAndStateAndDeletedIsFalse(
            DoctorSchedule doctorSchedule,
            MedicalExamState state
    );
}
