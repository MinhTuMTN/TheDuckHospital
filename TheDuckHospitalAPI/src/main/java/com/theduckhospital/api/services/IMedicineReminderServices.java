package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.MedicineReminderRequest;
import com.theduckhospital.api.dto.response.MedicineReminderResponse;
import com.theduckhospital.api.entity.MedicineReminder;

import java.util.List;
import java.util.UUID;

public interface IMedicineReminderServices {
    MedicineReminder patientCreateMedicineReminder(String token, MedicineReminderRequest request);
    List<MedicineReminderResponse> patientGetMedicineReminders(String token);
    void checkAndSendMedicineReminder();
    boolean confirmReceivedMedicineReminder(UUID reminderId, UUID confirmId);
}
