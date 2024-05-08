package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Patient;
import com.theduckhospital.api.entity.Staff;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PatientRepository extends JpaRepository<Patient, UUID> {
    Optional<Patient> findByIdentityNumberAndDeletedIsFalse(String identityNumber);
    Page<Patient> findPaginationByOrderByDeleted(Pageable pageable);
    List<Patient> findAll();

    @Query(value = "SELECT * FROM patient WHERE FREETEXT(full_name, :fullName) " +
            "OR phone_number = :phoneNumber " +
            "OR identity_number = :identityNumber",
            nativeQuery = true)
    List<Patient> findFullTextSearchByFullNameOrPhoneNumberContainingOrIdentityNumberContaining(
            @Param("fullName") String fullName,
            @Param("phoneNumber") String phoneNumber,
            @Param("identityNumber") String identityNumber
    );

    Optional<Patient> findPatientByPatientCodeAndDeletedIsFalse(String patientCode);
}
