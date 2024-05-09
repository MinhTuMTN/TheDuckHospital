package com.theduckhospital.api.repository;

import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.PatientProfile;
import com.theduckhospital.api.entity.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Query(value = "SELECT p.* " +
            "FROM patient_profile p " +
            "INNER JOIN ward w ON p.ward_ward_id = w.ward_id " +
            "INNER JOIN district d ON w.district_district_id = d.district_id " +
            "INNER JOIN province pro ON d.province_province_id = pro.province_id " +
            "INNER JOIN FREETEXTTABLE(patient_profile, full_name, :fullName) f ON p.patient_profile_id = f.[KEY] " +
            "WHERE YEAR(p.date_of_birth) = :dateOfBirth " +
            "AND pro.province_id = :provinceId " +
            "AND p.gender = :gender " +
            "ORDER BY f.[RANK] DESC ",
            nativeQuery = true
    )
    List<PatientProfile> findPatientProfilesByInfo(
            @Param("fullName") String fullName,
            @Param("dateOfBirth") int dateOfBirth,
            @Param("provinceId") int provinceId,
            @Param("gender") int gender
    );
}
