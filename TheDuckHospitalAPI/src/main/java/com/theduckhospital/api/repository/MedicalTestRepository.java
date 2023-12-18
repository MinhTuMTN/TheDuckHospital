package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.MedicalService;
import com.theduckhospital.api.entity.MedicalTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface MedicalTestRepository extends JpaRepository<MedicalTest, Integer> {
    long countByMedicalServiceAndDateAndDeletedIsFalse(
            MedicalService medicalService,
            Date date
    );
}
