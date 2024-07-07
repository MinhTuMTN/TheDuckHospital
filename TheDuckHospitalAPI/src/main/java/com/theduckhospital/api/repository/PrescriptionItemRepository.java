package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Prescription;
import com.theduckhospital.api.entity.PrescriptionItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PrescriptionItemRepository extends JpaRepository<PrescriptionItem, UUID> {
    List<PrescriptionItem> findByPrescriptionAndDeletedIsFalse(Prescription prescription);
    Optional<PrescriptionItem> findByPrescriptionAndPrescriptionItemIdAndDeletedIsFalse(
            Prescription prescription,
            UUID prescriptionItemId
    );
}
