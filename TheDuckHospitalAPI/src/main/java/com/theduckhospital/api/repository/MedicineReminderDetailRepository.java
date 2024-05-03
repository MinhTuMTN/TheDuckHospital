package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.MedicineReminderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface MedicineReminderDetailRepository extends JpaRepository<MedicineReminderDetail, UUID> {
    List<MedicineReminderDetail> findByReminderTimeAfterAndReminderTimeBeforeAndReceivedIsFalse(
            Date after, Date before
    );
}
