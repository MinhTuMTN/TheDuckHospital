package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.dto.request.MedicineReminderDetailsRequest;
import com.theduckhospital.api.dto.request.MedicineReminderRequest;
import com.theduckhospital.api.dto.response.MedicineReminderResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.repository.MedicineReminderDetailRepository;
import com.theduckhospital.api.repository.MedicineReminderRepository;
import com.theduckhospital.api.repository.PrescriptionItemRepository;
import com.theduckhospital.api.services.IAccountServices;
import com.theduckhospital.api.services.IFirebaseServices;
import com.theduckhospital.api.services.IMedicineReminderServices;
import com.theduckhospital.api.services.IPatientProfileServices;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class MedicineReminderServicesImpl implements IMedicineReminderServices {
    private final IAccountServices accountServices;
    private final IFirebaseServices firebaseServices;
    private final IPatientProfileServices patientProfileServices;
    private final MedicineReminderRepository medicineReminderRepository;
    private final MedicineReminderDetailRepository medicineReminderDetailRepository;
    private final PrescriptionItemRepository prescriptionItemRepository;

    public MedicineReminderServicesImpl(IAccountServices accountServices, IFirebaseServices firebaseServices, IPatientProfileServices patientProfileServices, MedicineReminderRepository medicineReminderRepository, MedicineReminderDetailRepository medicineReminderDetailRepository, PrescriptionItemRepository prescriptionItemRepository) {
        this.accountServices = accountServices;
        this.firebaseServices = firebaseServices;
        this.patientProfileServices = patientProfileServices;
        this.medicineReminderRepository = medicineReminderRepository;
        this.medicineReminderDetailRepository = medicineReminderDetailRepository;
        this.prescriptionItemRepository = prescriptionItemRepository;
    }

    @Override
    public MedicineReminder patientCreateMedicineReminder(String token, MedicineReminderRequest request) {
        Account account = accountServices.findAccountByToken(token);
        PatientProfile patientProfile = patientProfileServices.getPatientProfileById(
                token,
                request.getPatientProfileId()
        );

        PrescriptionItem prescriptionItem = prescriptionItemRepository.findById(request.getPrescriptionItemId())
                .orElseThrow(() -> new BadRequestException("Prescription item not found", 10024));

        if (!prescriptionItem
                .getPrescription()
                .getMedicalExaminationRecord()
                .getPatientProfile()
                .getPatientProfileId()
                .equals(
                    patientProfile.getPatientProfileId()
                )
        ) {
            throw new BadRequestException("Prescription item not found", 10024);
        }

        MedicineReminder medicineReminder = new MedicineReminder();
        medicineReminder.setPatientProfile(patientProfile);
        medicineReminder.setStartDate(request.getStartDate());
        medicineReminder.setAmount(request.getAmount());
        medicineReminder.setRemainingAmount(request.getAmount());
        medicineReminder.setPrescriptionItem(prescriptionItem);
        medicineReminderRepository.save(medicineReminder);

        Date startDate = request.getStartDate();
        float amount = request.getAmount();
        String medicineName = prescriptionItem.getMedicine().getMedicineName();
        String fullName = patientProfile.getFullName();

        while (amount > 0) {
            for (MedicineReminderDetailsRequest detail: request.getDetails())
            {
                if (amount <= 0)
                    break;

                Calendar calendar = Calendar.getInstance();
                calendar.setTime(startDate);
                calendar.set(Calendar.HOUR_OF_DAY, detail.getHour());
                calendar.set(Calendar.MINUTE, detail.getMinute());
                calendar.set(Calendar.SECOND, 0);

                MedicineReminderDetail medicineReminderDetail = new MedicineReminderDetail();
                medicineReminderDetail.setMedicineReminder(medicineReminder);
                medicineReminderDetail.setReminderTime(calendar.getTime());
                medicineReminderDetail.setAmount(detail.getAmount());
                medicineReminderDetail.setReminderIndex(detail.getIndex());
                medicineReminderDetail.setMedicineName(medicineName);
                medicineReminderDetail.setFullName(fullName);
                medicineReminderDetail.setAccount(account);

                medicineReminderDetailRepository.save(medicineReminderDetail);

                amount -= detail.getAmount();
            }

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(startDate);
            calendar.add(Calendar.DATE, 1);
            startDate = calendar.getTime();
        }

        startDate = new Date(startDate.getTime() - 86400000);
        medicineReminder.setEndDate(startDate);
        medicineReminderRepository.save(medicineReminder);

        return medicineReminder;
    }

    @Override
    public List<MedicineReminderResponse> patientGetMedicineReminders(String token) {
        Account account = accountServices.findAccountByToken(token);
        List<MedicineReminderResponse> result = new ArrayList<>();

        Date currentDate = new Date();
        for (PatientProfile patientProfile: account.getPatientProfile()) {
            if (patientProfile.isDeleted())
                continue;

            List<MedicineReminder> medicineReminders = medicineReminderRepository
                    .findByPatientProfileAndEndDateGreaterThanEqual(
                            patientProfile,
                            currentDate
                    );

            List<MedicineReminder> medicineReminderResult = new ArrayList<>();
            for (MedicineReminder medicineReminder: medicineReminders) {
                List<MedicineReminderDetail> medicineReminderDetails = medicineReminder.getListMedicineReminderDetail()
                        .stream().map(medicineReminderDetail -> {
                            if (medicineReminderDetail.getReminderTime().before(currentDate))
                                return null;
                            return medicineReminderDetail;
                        }).toList();

                if (medicineReminderDetails.isEmpty())
                    continue;

                medicineReminder.setListMedicineReminderDetail(medicineReminderDetails);
                medicineReminderResult.add(medicineReminder);
            }

            result.add(
                    MedicineReminderResponse.builder()
                            .medicineReminder(medicineReminderResult)
                            .patientProfile(patientProfile)
                            .build()
            );
        }

       return result;
    }

    @Override
    public void checkAndSendMedicineReminder() {
        Calendar yesterday = Calendar.getInstance();
        yesterday.add(Calendar.DATE, -1);

        Calendar currentDatePlus10 = Calendar.getInstance();
        currentDatePlus10.add(Calendar.MINUTE, 10);

        List<MedicineReminderDetail> medicineReminderDetails = medicineReminderDetailRepository
                .findByReminderTimeAfterAndReminderTimeBeforeAndReceivedIsFalse(
                        yesterday.getTime(),
                        currentDatePlus10.getTime()
                );

        for (MedicineReminderDetail medicineReminderDetail: medicineReminderDetails) {
            String title = "Nhắc nhở uống thuốc";
            String fullName = medicineReminderDetail.getFullName();
            String medicineName = medicineReminderDetail.getMedicineName();

            // format time to dd/MM/yyyy HH:mm
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm");
            String reminderTime = formatter.format(medicineReminderDetail.getReminderTime());

            String message = fullName
                    + ", đã đến giờ uống thuốc "
                    + medicineName + " vào lúc "
                    + reminderTime;

            Map<String, String> data = Map.of(
                    "title", title,
                    "body", message,
                    "action", "reminder",
                    "value", "",
                    "notificationId", medicineReminderDetail.getMedicineReminderDetailId().toString(),
                    "confirmId", medicineReminderDetail.getConfirmationId().toString(),
                    "channelId", "reminder"
            );

            firebaseServices.sendNotificationToAccount(
                    medicineReminderDetail.getAccount(),
                    data
            );
        }
    }

    @Override
    public boolean confirmReceivedMedicineReminder(UUID reminderId, UUID confirmId) {
        MedicineReminderDetail medicineReminderDetail = medicineReminderDetailRepository
                .findById(reminderId)
                .orElseThrow(() -> new BadRequestException("Medicine reminder detail not found", 10025));

        if (medicineReminderDetail.getConfirmationId().equals(confirmId)) {
            medicineReminderDetail.setReceived(true);
            medicineReminderDetailRepository.save(medicineReminderDetail);
        } else
            throw new BadRequestException("Medicine reminder detail not found", 10025);

        return true;
    }
}
