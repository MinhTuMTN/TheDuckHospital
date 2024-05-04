package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.entity.MedicineReminder;
import com.theduckhospital.api.entity.PrescriptionItem;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PrescriptionItemForReminderResponse {
    private PrescriptionItem prescriptionItem;
    private MedicineReminderDetailsResponse medicineReminder;
}
