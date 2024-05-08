package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.MedicineReminder;
import com.theduckhospital.api.entity.MedicineReminderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MedicineReminderDetailRepository extends JpaRepository<MedicineReminderDetail, UUID> {
    List<MedicineReminderDetail> findByReminderTimeAfterAndReminderTimeBeforeAndReceivedIsFalseAndUsedIsFalse(
            Date after, Date before
    );
    @Query(value = "SELECT mrd.reminder_index, CAST(mrd.reminder_time AS TIME), mrd.amount " +
            "FROM medicine_reminder_detail mrd " +
            "WHERE mrd.medicine_reminder_medicine_reminder_id = :medicineReminderId " +
            "GROUP BY mrd.reminder_index, CAST(mrd.reminder_time AS TIME), mrd.amount",
            nativeQuery = true
    )
    List<Object[]> findGroupedByReminderIndexAndTime(@Param("medicineReminderId") UUID medicineReminderId);

    @Query(value = "SELECT mrd " +
            "FROM MedicineReminderDetail mrd " +
            "WHERE mrd.medicineReminder.medicineReminderId = :medicineReminderId " +
            "AND mrd.medicineReminderDetailId = :medicineReminderDetailId " +
            "AND mrd.deleted = false " +
            "AND mrd.account = :account"
    )
    Optional<MedicineReminderDetail> findByReminderAndId(
            UUID medicineReminderId,
            UUID medicineReminderDetailId,
            Account account
    );

    @Query(value = "SELECT mrd " +
            "FROM MedicineReminderDetail mrd " +
            "WHERE mrd.account = :account " +
            "AND mrd.deleted = false " +
            "AND mrd.reminderTime < :before " +
            "AND mrd.reminderTime >= :after"
    )
    List<MedicineReminderDetail> findByAccountAndDateBeforeAndDateAfter(
            Account account,
            Date before,
            Date after
    );
}
