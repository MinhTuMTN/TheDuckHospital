package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.entity.Prescription;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PrescriptionDetailForReminderResponse {
    private Prescription prescription;
    private List<PrescriptionItemForReminderResponse> remindedPrescriptionItems;
    private List<PrescriptionItemForReminderResponse> notRemindedPrescriptionItems;
}
