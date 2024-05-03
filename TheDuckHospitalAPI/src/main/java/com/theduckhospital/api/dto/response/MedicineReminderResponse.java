package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.entity.MedicineReminder;
import com.theduckhospital.api.entity.PatientProfile;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MedicineReminderResponse {
    private PatientProfile patientProfile;
    private List<MedicineReminder> medicineReminder;
}
