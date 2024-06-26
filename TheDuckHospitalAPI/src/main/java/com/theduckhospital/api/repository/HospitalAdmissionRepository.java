package com.theduckhospital.api.repository;

import com.theduckhospital.api.constant.HospitalAdmissionState;
import com.theduckhospital.api.entity.HospitalAdmission;
import com.theduckhospital.api.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface HospitalAdmissionRepository extends JpaRepository<HospitalAdmission, UUID> {
    List<HospitalAdmission> findByRoomAndStateAndPatientProfile_FullNameContainingAndDeletedIsFalse(Room room, HospitalAdmissionState state, String patientProfile_fullName);
    Optional<HospitalAdmission> findByHospitalAdmissionCodeAndDeletedIsFalse(String hospitalAdmissionCode);
    Optional<HospitalAdmission> findByHospitalAdmissionIdAndDeletedIsFalse(UUID hospitalAdmissionId);
}
