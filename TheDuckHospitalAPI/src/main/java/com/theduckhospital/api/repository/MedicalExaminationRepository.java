package com.theduckhospital.api.repository;

import com.theduckhospital.api.constant.MedicalExamState;
import com.theduckhospital.api.entity.*;
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

    List<MedicalExaminationRecord> findByPatientAndDoctorSchedule_MedicalService_DepartmentAndDeletedIsFalseAndDoctorSchedule_DateBefore(
            Patient patient, Department doctorSchedule_medicalService_department, Date doctorSchedule_date
    );

    Page<MedicalExaminationRecord> findByPatientProfileAndDeletedIsFalseAndStateOrderByDoctorSchedule_CreatedDateDesc(
            PatientProfile patientProfile,
            MedicalExamState state,
            Pageable pageable
    );

    @Query("SELECT CAST(m.createdDate AS DATE), COUNT(m) " +
            "FROM MedicalExaminationRecord m " +
            "WHERE (m.createdDate BETWEEN :startDate AND :endDate) " +
            "AND m.deleted = false AND m.doctorSchedule.doctor.staffId = :doctorId " +
            "GROUP BY CAST(m.createdDate AS DATE) " +
            "ORDER BY CAST(m.createdDate AS DATE) ASC")
    List<Object[]> countPatientsByCreatedAtBetweenAndDeletedIsFalse(
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("doctorId") UUID doctorId
    );

//    List<MedicalExaminationRecord> findByDeletedIsFalseAndState(MedicalExamState medicalExamState);

    long countByDeletedIsFalseAndStateInAndDoctorSchedule_Doctor(List<MedicalExamState> medicalExamStates, Doctor doctor);
}
