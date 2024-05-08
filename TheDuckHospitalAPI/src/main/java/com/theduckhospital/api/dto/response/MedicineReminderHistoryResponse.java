package com.theduckhospital.api.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MedicineReminderHistoryResponse {
    private String patientProfileId;
    private String fullName;
    private List<PrescriptionItemForReminderResponse> usingPrescriptionItems;
    private List<PrescriptionItemForReminderResponse> usedPrescriptionItems;
}
