package com.theduckhospital.api.repository;

import com.theduckhospital.api.constant.MedicalTestState;
import com.theduckhospital.api.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;
import java.util.List;

@Repository
public interface MedicalTestRepository extends JpaRepository<MedicalTest, UUID> {
    long countByRoomAndStateAndDeletedIsFalse(Room room, MedicalTestState state);
    Optional<MedicalTest> findByMedicalTestCodeAndDeletedIsFalse(String medicalTestCode);

    @Query(value = "SELECT mt FROM MedicalTest mt " +
            "JOIN MedicalExaminationRecord mer ON mt.medicalExaminationRecord = mer " +
            "JOIN Patient p ON mer.patient = p " +
            "where mt.room = :room " +
            "AND mt.deleted = false " +
            "AND p.fullName  LIKE CONCAT('%', :search, '%') " +
            "AND mt.state = :state"
    )
    Page<MedicalTest> findByRoomAndStateAndDeletedIsFalseOrderByQueueNumber(
            Room room,
            String search,
            MedicalTestState state,
            Pageable pageable
    );

    @Query(value = "SELECT mt FROM MedicalTest mt " +
            "JOIN HospitalAdmission ha ON mt.hospitalAdmission = ha " +
            "JOIN MedicalExaminationRecord mer ON ha.medicalExaminationRecord = mer " +
            "JOIN Patient p ON mer.patient = p " +
            "where mt.room = :room " +
            "AND mt.deleted = false " +
            "AND p.fullName  LIKE CONCAT('%', :search, '%') " +
            "AND mt.state = :state"
    )
    Page<MedicalTest> findAdmissionTestByRoomAndStateAndDeletedIsFalseOrderByQueueNumber(
            Room room,
            String search,
            MedicalTestState state,
            Pageable pageable
    );

    List<MedicalTest> findByMedicalExaminationRecordAndDeletedIsFalse(MedicalExaminationRecord medicalExaminationRecord);
    Page<MedicalTest> findByHospitalAdmissionAndDeletedIsFalseOrderByDateDesc(
            HospitalAdmission hospitalAdmission,
            Pageable pageable
    );
    Page<MedicalTest> findByHospitalAdmissionAndMedicalServiceAndDeletedIsFalseOrderByDateDesc(
            HospitalAdmission hospitalAdmission,
            MedicalService medicalService,
            Pageable pageable
    );
    List<MedicalTest> findByHospitalAdmissionAndDateBetweenAndDeletedIsFalse(
            HospitalAdmission hospitalAdmission,
            Date startDate,
            Date endDate
    );
}
