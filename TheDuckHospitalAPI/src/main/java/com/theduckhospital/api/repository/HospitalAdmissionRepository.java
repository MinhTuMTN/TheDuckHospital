package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.HospitalAdmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface HospitalAdmissionRepository extends JpaRepository<HospitalAdmission, UUID> {
    Optional<HospitalAdmission> findByHospitalAdmissionCodeAndDeletedIsFalse(String hospitalAdmissionCode);
}
