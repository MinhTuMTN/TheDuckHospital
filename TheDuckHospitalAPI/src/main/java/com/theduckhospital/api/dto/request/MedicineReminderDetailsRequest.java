package com.theduckhospital.api.dto.request;

import lombok.Data;

@Data
public class MedicineReminderDetailsRequest {
    private int hour;
    private int minute;
    private float amount;
    private int index;
}
