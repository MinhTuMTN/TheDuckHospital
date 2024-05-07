package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.PatientProfile;
import com.theduckhospital.api.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, UUID> {
    @Query("SELECT p " +
            "FROM Prescription p " +
            "WHERE p.medicalExaminationRecord.patientProfile = :patientProfile " +
            "AND p.prescriptionId = :prescriptionId " +
            "AND p.deleted = false"
    )
    Optional<Prescription> findByPatientProfileAndPrescriptionId(PatientProfile patientProfile, UUID prescriptionId);
    @Query("SELECT p " +
            "FROM Prescription p " +
            "WHERE p.medicalExaminationRecord.patientProfile = :patientProfile " +
            "AND p.createdAt BETWEEN :fromDate AND :toDate"
    )
    List<Prescription> findByPatientProfileAndDateBetween(PatientProfile patientProfile, Date fromDate, Date toDate);
}
