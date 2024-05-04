package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.entity.MedicineReminder;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class MedicineReminderDetailsResponse {
    private UUID medicineReminderId;
    private Date startDate;
    private Date endDate;
    private float amount;
    private float remainingAmount;
    private Date createdAt;
    private Date updatedAt;
    private boolean deleted;

    public MedicineReminderDetailsResponse(MedicineReminder medicineReminder) {
        this.medicineReminderId = medicineReminder.getMedicineReminderId();
        this.startDate = medicineReminder.getStartDate();
        this.endDate = medicineReminder.getEndDate();
        this.amount = medicineReminder.getAmount();
        this.remainingAmount = medicineReminder.getRemainingAmount();
        this.createdAt = medicineReminder.getCreatedAt();
        this.updatedAt = medicineReminder.getUpdatedAt();
        this.deleted = medicineReminder.isDeleted();
    }
}
