package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.MedicineReminderRequest;
import com.theduckhospital.api.dto.response.MedicineReminderHistoryResponse;
import com.theduckhospital.api.dto.response.MedicineReminderResponse;
import com.theduckhospital.api.dto.response.PrescriptionDetailForReminderResponse;
import com.theduckhospital.api.dto.response.PrescriptionResponse;
import com.theduckhospital.api.entity.MedicineReminder;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface IMedicineReminderServices {
    MedicineReminder patientCreateMedicineReminder(String token, MedicineReminderRequest request);
    MedicineReminder patientUpdateMedicineReminder(String token, UUID reminderId, MedicineReminderRequest request);
    List<MedicineReminderResponse> patientGetMedicineReminders(String token, Date date);
    void checkAndSendMedicineReminder();
    boolean confirmReceivedMedicineReminder(UUID reminderId, UUID confirmId);
    List<PrescriptionResponse> searchPrescription(
            String token,
            UUID patientProfileId,
            Date fromDate,
            Date toDate
    );
    PrescriptionDetailForReminderResponse getReminderPrescription(
            String token,
            UUID prescriptionId,
            UUID patientProfileId
    );
    boolean deleteMedicineReminderDetails(
            String token,
            UUID medicineReminderId,
            UUID medicineReminderDetailId,
            String type
    );
    boolean deleteMedicineReminder(String token, UUID medicineReminderId);
    List<PrescriptionResponse> searchPrescriptionByCode(
            String token,
            UUID patientProfileId,
            String prescriptionCode
    );
    List<MedicineReminderHistoryResponse> getMedicineReminderHistory(
            String token
    );
}
