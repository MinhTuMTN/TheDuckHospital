package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.MedicineReminder;
import com.theduckhospital.api.entity.Patient;
import com.theduckhospital.api.entity.PatientProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface MedicineReminderRepository extends JpaRepository<MedicineReminder, UUID> {
    List<MedicineReminder> findByPatientProfileAndEndDateGreaterThanEqual(
            PatientProfile patientProfile,
            Date endDate
    );
}
