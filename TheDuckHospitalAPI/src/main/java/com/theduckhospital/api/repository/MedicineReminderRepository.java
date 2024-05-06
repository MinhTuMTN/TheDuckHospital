package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MedicineReminderRepository extends JpaRepository<MedicineReminder, UUID> {
    List<MedicineReminder> findByPatientProfileAndEndDateGreaterThanEqual(
            PatientProfile patientProfile,
            Date endDate
    );

    @Query("SELECT mr " +
            "FROM MedicineReminder mr " +
            "WHERE mr.patientProfile = :patientProfile " +
            "AND mr.prescriptionItem = :prescriptionItem " +
            "AND mr.deleted = false " +
            "ORDER BY mr.createdAt DESC "
    )
    Optional<MedicineReminder> findByPatientProfileAndPrescriptionItem(
            PatientProfile patientProfile,
            PrescriptionItem prescriptionItem
    );

    @Query("SELECT mr " +
            "FROM MedicineReminder mr " +
            "WHERE mr.patientProfile.account = :account " +
            "AND mr.deleted = false " +
            "AND mr.medicineReminderId = :medicineReminderId"
    )
    Optional<MedicineReminder> findByAccountAndId(Account account, UUID medicineReminderId);
}
