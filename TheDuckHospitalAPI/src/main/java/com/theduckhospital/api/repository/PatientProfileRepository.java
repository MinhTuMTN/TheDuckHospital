package com.theduckhospital.api.repository;

import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.PatientProfile;
import com.theduckhospital.api.entity.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PatientProfileRepository extends JpaRepository<PatientProfile, UUID> {
    List<PatientProfile> findPatientProfilesByAccountAndDeletedIsFalse(Account account);

    @Query("SELECT p " +
            "FROM PatientProfile p " +
            "WHERE p.fullName LIKE %?1% " +
            "AND p.deleted = false " +
            "AND (p.identityNumber LIKE %?2% OR p.phoneNumber LIKE %?2%)")
    List<PatientProfile> findPatientProfiles(String patientName, String identityNumber);

    @Query("SELECT p " +
            "FROM PatientProfile p " +
            "WHERE p.fullName = ?1 " +
            "AND YEAR(p.dateOfBirth) = ?2 " +
            "AND p.ward.district.province = ?3 " +
            "AND p.gender = ?4 " +
            "AND p.deleted = false")
    List<PatientProfile> findPatientProfilesByInfo(
            String fullName,
            int dateOfBirth_year,
            Province ward_district_province,
            Gender gender
    );
}
