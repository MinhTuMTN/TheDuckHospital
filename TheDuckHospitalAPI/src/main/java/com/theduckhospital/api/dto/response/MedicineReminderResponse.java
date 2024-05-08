package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.constant.MedicineUnit;
import com.theduckhospital.api.entity.MedicineReminder;
import com.theduckhospital.api.entity.MedicineReminderDetail;
import com.theduckhospital.api.entity.PatientProfile;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class MedicineReminderResponse {
    private UUID medicineReminderId;
    private UUID medicineReminderDetailId;
    private String fullName;
    private Date reminderTime;
    private String medicineName;
    private MedicineUnit medicineUnit;
    private float amount;
    private float remainingAmount;
    private boolean used;
    private boolean ignore;

    public MedicineReminderResponse(MedicineReminderDetail medicineReminderDetail) {
        this.medicineReminderId = medicineReminderDetail.getMedicineReminder().getMedicineReminderId();
        this.medicineReminderDetailId = medicineReminderDetail.getMedicineReminderDetailId();
        this.fullName = medicineReminderDetail.getFullName();
        this.reminderTime = medicineReminderDetail.getReminderTime();
        this.medicineName = medicineReminderDetail.getMedicineName();
        this.medicineUnit = medicineReminderDetail.getMedicineUnit();
        this.amount = medicineReminderDetail.getAmount();
        this.remainingAmount = medicineReminderDetail.getMedicineReminder().getRemainingAmount();
        this.used = medicineReminderDetail.isUsed();
        this.ignore = medicineReminderDetail.isIgnore();
    }
}
