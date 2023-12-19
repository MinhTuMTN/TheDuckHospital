package com.theduckhospital.api.repository;

import com.theduckhospital.api.constant.MedicalTestState;
import com.theduckhospital.api.entity.MedicalService;
import com.theduckhospital.api.entity.MedicalTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface MedicalTestRepository extends JpaRepository<MedicalTest, UUID> {
    long countByMedicalServiceAndDateAndDeletedIsFalse(
            MedicalService medicalService,
            Date date
    );

    Page<MedicalTest> findByMedicalServiceAndDeletedIsFalseAndMedicalExaminationRecord_PatientProfile_FullNameContainingIgnoreCaseAndStateOrderByQueueNumber(
            MedicalService medicalService,
            String patientName,
            MedicalTestState state,
            Pageable pageable
    );

    long countByMedicalServiceAndStateAndDeletedIsFalse(MedicalService medicalService, MedicalTestState state);

    List<MedicalTest> findByMedicalServiceAndStateOrderByQueueNumberDesc(
            MedicalService medicalService,
            MedicalTestState state
    );
}
