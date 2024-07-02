package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.HospitalizationDetail;
import com.theduckhospital.api.entity.TreatmentMedicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TreatmentMedicineRepository extends JpaRepository<TreatmentMedicine, UUID>{
    List<TreatmentMedicine> findByHospitalizationDetailAndDeletedIsFalse(
            HospitalizationDetail hospitalizationDetail
    );
}
