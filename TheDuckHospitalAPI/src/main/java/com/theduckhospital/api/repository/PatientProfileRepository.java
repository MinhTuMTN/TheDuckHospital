package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.PatientProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PatientProfileRepository extends JpaRepository<PatientProfile, UUID> {
    List<PatientProfile> findPatientProfilesByAccountAndDeletedIsFalse(Account account);
}
