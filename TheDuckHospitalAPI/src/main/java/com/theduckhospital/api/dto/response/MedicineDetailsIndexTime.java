package com.theduckhospital.api.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class MedicineDetailsIndexTime {
    private int reminderIndex;
    private String reminderTime;
}
