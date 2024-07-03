package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.HospitalAdmission;
import com.theduckhospital.api.entity.HospitalizationDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface HospitalizationDetailRepository extends JpaRepository<HospitalizationDetail, UUID>{

    Optional<HospitalizationDetail> findByHospitalAdmissionAndHospitalizationDate(
            HospitalAdmission hospitalAdmission,
            Date hospitalizationDate
    );
}
