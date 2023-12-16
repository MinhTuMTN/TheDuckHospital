package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PatientRepository extends JpaRepository<Patient, UUID> {
    Optional<Patient> findByIdentityNumberAndDeletedIsFalse(String identityNumber);
    Page<Patient> findPaginationByOrderByDeleted(Pageable pageable);
    List<Patient> findByFullNameContainingOrPhoneNumberContainingOrIdentityNumberContaining(
            String fullName,
            String phoneNumber,
            String identityNumber
    );
}
