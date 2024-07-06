package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.HospitalAdmission;
import com.theduckhospital.api.entity.HospitalizationDetail;
import com.theduckhospital.api.entity.Medicine;
import com.theduckhospital.api.entity.TreatmentMedicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TreatmentMedicineRepository extends JpaRepository<TreatmentMedicine, UUID>{
    List<TreatmentMedicine> findByHospitalizationDetailAndDeletedIsFalse(
            HospitalizationDetail hospitalizationDetail
    );
    Optional<TreatmentMedicine> findByHospitalizationDetailAndMedicineAndDeletedIsFalse(
            HospitalizationDetail hospitalizationDetail,
            Medicine medicine
    );
    Optional<TreatmentMedicine> findByTreatmentMedicineIdAndHospitalizationDetail_HospitalAdmissionAndDeletedIsFalse(
            UUID treatmentMedicineId,
            HospitalAdmission hospitalizationDetail_hospitalAdmission
    );

    @Query("SELECT tm.medicineId, tm.medicineName, sum(tm.quantity), tm.unitPrice, sum(tm.totalAmount) " +
            "FROM TreatmentMedicine tm " +
            "WHERE tm.hospitalizationDetail.hospitalAdmission = :hospitalAdmission " +
            "AND tm.deleted = false " +
            "GROUP BY tm.medicineId, tm.medicineName, tm.unitPrice"
    )
    List<Object[]> findTreatmentMedicineForInvoice(
            HospitalAdmission hospitalAdmission
    );
}
