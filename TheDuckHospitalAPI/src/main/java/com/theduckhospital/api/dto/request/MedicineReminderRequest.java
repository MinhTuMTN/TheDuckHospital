package com.theduckhospital.api.dto.request;

import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class MedicineReminderRequest {
    private UUID patientProfileId;
    private UUID prescriptionItemId;
    private Date startDate;
    private float amount;
    private List<MedicineReminderDetailsRequest> details;
}
