package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.DateCommon;
import com.theduckhospital.api.constant.MedicineUnit;
import com.theduckhospital.api.dto.request.MedicineReminderDetailsRequest;
import com.theduckhospital.api.dto.request.MedicineReminderRequest;
import com.theduckhospital.api.dto.response.*;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.repository.MedicineReminderDetailRepository;
import com.theduckhospital.api.repository.MedicineReminderRepository;
import com.theduckhospital.api.repository.PrescriptionItemRepository;
import com.theduckhospital.api.repository.PrescriptionRepository;
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
    private final PrescriptionRepository prescriptionRepository;

    public MedicineReminderServicesImpl(IAccountServices accountServices, IFirebaseServices firebaseServices, IPatientProfileServices patientProfileServices, MedicineReminderRepository medicineReminderRepository, MedicineReminderDetailRepository medicineReminderDetailRepository, PrescriptionItemRepository prescriptionItemRepository, PrescriptionRepository prescriptionRepository) {
        this.accountServices = accountServices;
        this.firebaseServices = firebaseServices;
        this.patientProfileServices = patientProfileServices;
        this.medicineReminderRepository = medicineReminderRepository;
        this.medicineReminderDetailRepository = medicineReminderDetailRepository;
        this.prescriptionItemRepository = prescriptionItemRepository;
        this.prescriptionRepository = prescriptionRepository;
    }

    @Override
    public MedicineReminder patientCreateMedicineReminder(String token, MedicineReminderRequest request) {
        Account account = accountServices.findAccountByToken(token);

        Calendar startOfToday = Calendar.getInstance();
        startOfToday.add(Calendar.DATE, -1);
        startOfToday.set(Calendar.HOUR_OF_DAY, 23);
        startOfToday.set(Calendar.MINUTE, 59);
        startOfToday.set(Calendar.SECOND, 59);

        Calendar dateRequest = Calendar.getInstance();
        dateRequest.setTime(request.getStartDate());
        dateRequest.set(Calendar.HOUR_OF_DAY, 0);
        dateRequest.set(Calendar.MINUTE, 0);
        dateRequest.set(Calendar.SECOND, 0);

        if (dateRequest.before(startOfToday)) {
            throw new BadRequestException("Start date must be greater than or equal to today", 10029);
        }

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

        // Check already exist medicine reminder
        Optional<MedicineReminder> existMedicineReminder = medicineReminderRepository
                .findExistMedicineReminder(
                        request.getStartDate(),
                        prescriptionItem,
                        patientProfile
                );

        if (existMedicineReminder.isPresent()) {
            throw new BadRequestException("Medicine reminder already exist", 10030);
        }

        MedicineReminder medicineReminder = new MedicineReminder();
        medicineReminder.setPatientProfile(patientProfile);
        medicineReminder.setStartDate(dateRequest.getTime());
        medicineReminder.setAmount(request.getAmount());
        medicineReminder.setRemainingAmount(request.getAmount());
        medicineReminder.setPrescriptionItem(prescriptionItem);
        medicineReminderRepository.save(medicineReminder);

        Date startDate = dateRequest.getTime();
        float amount = request.getAmount();
        Medicine medicine = prescriptionItem.getMedicine();
        String medicineName = medicine.getMedicineName();
        MedicineUnit medicineUnit = medicine.getUnit();
        String fullName = patientProfile.getFullName();

        while (amount > 0) {
            int index = 0;
            for (MedicineReminderDetailsRequest detail : request.getDetails()) {
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
                medicineReminderDetail.setReminderIndex(index++);
                medicineReminderDetail.setMedicineName(medicineName);
                medicineReminderDetail.setUsed(false);
                medicineReminderDetail.setMedicineUnit(medicineUnit);
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
    public MedicineReminder patientUpdateMedicineReminder(String token, UUID reminderId, MedicineReminderRequest request) {
        Account account = accountServices.findAccountByToken(token);
        MedicineReminder medicineReminder = medicineReminderRepository
                .findByAccountAndId(
                        account,
                        reminderId
                ).orElseThrow(() -> new BadRequestException("Medicine reminder not found", 10027));

        // If medicine reminder is deleted or end date is less than today
        // then throw exception
        if (medicineReminder.isDeleted() || medicineReminder.getEndDate().before(new Date())) {
            throw new BadRequestException("Medicine reminder not found", 10027);
        }

        // If not update start date and amount
        // update details only
        Date startDate = medicineReminder.getStartDate();
        float amount = medicineReminder.getAmount();
        Date startDateRequest = DateCommon.getStarOfDay(request.getStartDate());
        float amountRequest = request.getAmount();
        if (startDate.getTime() == startDateRequest.getTime() && amount == amountRequest) {
            List<MedicineReminderDetail> medicineReminderDetails = medicineReminder
                    .getListMedicineReminderDetail();

            for (MedicineReminderDetail medicineReminderDetail: medicineReminderDetails) {
                Calendar reminderTime = Calendar.getInstance();
                reminderTime.setTime(medicineReminderDetail.getReminderTime());

                for (MedicineReminderDetailsRequest detail: request.getDetails()) {
                    if (medicineReminderDetail.getReminderIndex() == detail.getIndex()) {
                        reminderTime.set(Calendar.HOUR_OF_DAY, detail.getHour());
                        reminderTime.set(Calendar.MINUTE, detail.getMinute());
                        reminderTime.set(Calendar.SECOND, 0);
                        medicineReminderDetail.setReminderTime(reminderTime.getTime());
                    }
                }
            }

            medicineReminderDetailRepository.saveAll(medicineReminderDetails);
        } else {
            medicineReminderDetailRepository.deleteAll(
                    medicineReminder.getListMedicineReminderDetail()
            );

            PatientProfile patientProfile = patientProfileServices.getPatientProfileById(
                    token,
                    request.getPatientProfileId()
            );

            PrescriptionItem prescriptionItem = medicineReminder.getPrescriptionItem();
            Medicine medicine = prescriptionItem.getMedicine();
            String medicineName = medicine.getMedicineName();
            MedicineUnit medicineUnit = medicine.getUnit();
            String fullName = patientProfile.getFullName();

            medicineReminder.setStartDate(startDateRequest);
            medicineReminder.setAmount(amountRequest);
            medicineReminder.setRemainingAmount(amountRequest);
            medicineReminder.setPrescriptionItem(prescriptionItem);
            medicineReminderRepository.save(medicineReminder);

            while (amountRequest > 0) {
                int index = 0;
                for (MedicineReminderDetailsRequest detail : request.getDetails()) {
                    if (amountRequest <= 0)
                        break;

                    Calendar calendar = Calendar.getInstance();
                    calendar.setTime(startDateRequest);
                    calendar.set(Calendar.HOUR_OF_DAY, detail.getHour());
                    calendar.set(Calendar.MINUTE, detail.getMinute());
                    calendar.set(Calendar.SECOND, 0);

                    MedicineReminderDetail medicineReminderDetail = new MedicineReminderDetail();
                    medicineReminderDetail.setMedicineReminder(medicineReminder);
                    medicineReminderDetail.setReminderTime(calendar.getTime());
                    medicineReminderDetail.setAmount(detail.getAmount());

                    medicineReminderDetail.setUsed(medicineReminderDetail
                            .getReminderTime()
                            .before(new Date())
                    );
                    medicineReminderDetail.setReminderIndex(index++);
                    medicineReminderDetail.setMedicineName(medicineName);
                    medicineReminderDetail.setMedicineUnit(medicineUnit);
                    medicineReminderDetail.setFullName(fullName);
                    medicineReminderDetail.setAccount(account);

                    medicineReminderDetailRepository.save(medicineReminderDetail);



                    amountRequest -= detail.getAmount();
                }

                Calendar calendar = Calendar.getInstance();
                calendar.setTime(startDateRequest);
                calendar.add(Calendar.DATE, 1);
                startDateRequest = calendar.getTime();
            }

            startDateRequest = new Date(startDateRequest.getTime() - 86400000);
            medicineReminder.setEndDate(startDateRequest);
            medicineReminderRepository.save(medicineReminder);
        }

        return medicineReminder;
    }

    @Override
    public List<MedicineReminderResponse> patientGetMedicineReminders(String token, Date date) {
        Account account = accountServices.findAccountByToken(token);
        List<MedicineReminderResponse> result = new ArrayList<>();

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DATE, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);

        Date before = calendar.getTime();
        calendar.add(Calendar.DATE, -1);
        Date after = calendar.getTime();

        List<MedicineReminderDetail> medicineReminderDetails = medicineReminderDetailRepository
                .findByAccountAndDateBeforeAndDateAfter(
                        account,
                        before,
                        after
                );

        for (MedicineReminderDetail medicineReminderDetail : medicineReminderDetails) {
            result.add(new MedicineReminderResponse(medicineReminderDetail));
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
                .findByReminderTimeAfterAndReminderTimeBeforeAndReceivedIsFalseAndUsedIsFalse(
                        yesterday.getTime(),
                        currentDatePlus10.getTime()
                );

        for (MedicineReminderDetail medicineReminderDetail : medicineReminderDetails) {
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

    @Override
    public List<PrescriptionResponse> searchPrescription(String token, UUID patientProfileId, Date fromDate, Date toDate) {
        PatientProfile patientProfile = patientProfileServices.getPatientProfileById(token, patientProfileId);
        fromDate = DateCommon.getStarOfDay(fromDate);
        toDate = DateCommon.getEndOfDay(toDate);
        
        List<Prescription> prescriptions = prescriptionRepository
                .findByPatientProfileAndDateBetween(
                        patientProfile,
                        fromDate,
                        toDate
                );

        return prescriptions.stream().map(PrescriptionResponse::new).toList();
    }

    @Override
    public PrescriptionDetailForReminderResponse getReminderPrescription(String token, UUID prescriptionId, UUID patientProfileId) {
        PatientProfile patientProfile = patientProfileServices.getPatientProfileById(
                token,
                patientProfileId
        );

        Prescription prescription = prescriptionRepository
                .findByPatientProfileAndPrescriptionId(
                        patientProfile,
                        prescriptionId
                ).orElseThrow(() -> new BadRequestException("Prescription not found", 10026));

        List<PrescriptionItemForReminderResponse> remindedPrescriptionItems = new ArrayList<>();
        List<PrescriptionItemForReminderResponse> notRemindedPrescriptionItems = new ArrayList<>();

        for (PrescriptionItem prescriptionItem : prescription.getPrescriptionItems()) {
            if (prescriptionItem.isDeleted())
                continue;

            Optional<MedicineReminder> medicineReminder = medicineReminderRepository
                    .findByPatientProfileAndPrescriptionItem(
                            patientProfile,
                            prescriptionItem
                    );

            if (medicineReminder.isEmpty()) {
                notRemindedPrescriptionItems.add(
                        PrescriptionItemForReminderResponse.builder()
                                .prescriptionItem(prescriptionItem)
                                .build()
                );
            } else {
                List<Object[]> medicineReminderDetails = medicineReminderDetailRepository
                        .findGroupedByReminderIndexAndTime(
                                medicineReminder.get().getMedicineReminderId()
                        );
                List<MedicineDetailsIndexTime> indexTimes = new ArrayList<>();
                for (Object[] objects : medicineReminderDetails) {
                    indexTimes.add(
                            MedicineDetailsIndexTime.builder()
                                    .reminderIndex((int) objects[0])
                                    .reminderTime(objects[1].toString())
                                    .build()
                    );
                }
                remindedPrescriptionItems.add(
                        PrescriptionItemForReminderResponse.builder()
                                .prescriptionItem(prescriptionItem)
                                .medicineReminder(new MedicineReminderDetailsResponse(
                                        medicineReminder.get(),
                                        indexTimes
                                ))
                                .build()
                );
            }
        }

        return PrescriptionDetailForReminderResponse.builder()
                .prescription(prescription)
                .remindedPrescriptionItems(remindedPrescriptionItems)
                .notRemindedPrescriptionItems(notRemindedPrescriptionItems)
                .build();
    }

    @Override
    public boolean deleteMedicineReminderDetails(
            String token,
            UUID medicineReminderId,
            UUID medicineReminderDetailId,
            String type
    ) {
        Account account = accountServices.findAccountByToken(token);
        Optional<MedicineReminderDetail> optional = medicineReminderDetailRepository
                .findByReminderAndId(
                        medicineReminderId,
                        medicineReminderDetailId,
                        account
                );

        if (optional.isEmpty())
            throw new BadRequestException("Medicine reminder detail not found", 10025);

        MedicineReminderDetail medicineReminderDetail = optional.get();
        MedicineReminder medicineReminder = medicineReminderDetail.getMedicineReminder();

        if (medicineReminderDetail.isUsed()) {
            medicineReminder.setRemainingAmount(medicineReminder.getRemainingAmount() + medicineReminderDetail.getAmount());
            medicineReminderRepository.save(medicineReminder);
        }

        if (type.equals("ignore")) {
            medicineReminderDetail.setUsed(false);
            medicineReminderDetail.setIgnore(!medicineReminderDetail.isIgnore());
        } else {
            medicineReminderDetail.setUsed(!medicineReminderDetail.isUsed());
            medicineReminderDetail.setIgnore(false);

            if (medicineReminderDetail.isUsed()) {
                medicineReminder.setRemainingAmount(
                        medicineReminder.getRemainingAmount() - medicineReminderDetail.getAmount()
                );
                medicineReminderRepository.save(medicineReminder);
            }
        }

        medicineReminderDetailRepository.save(medicineReminderDetail);

        return true;
    }

    @Override
    public boolean deleteMedicineReminder(String token, UUID medicineReminderId) {
        Account account = accountServices.findAccountByToken(token);
        Optional<MedicineReminder> optional = medicineReminderRepository
                .findByAccountAndId(
                        account,
                        medicineReminderId
                );

        if (optional.isEmpty())
            throw new BadRequestException("Medicine reminder not found", 10027);

        MedicineReminder medicineReminder = optional.get();
        medicineReminder.setDeleted(true);
        medicineReminderRepository.save(medicineReminder);

        medicineReminderDetailRepository.deleteAll(
                medicineReminder.getListMedicineReminderDetail()
        );
        return true;
    }

    @Override
    public List<PrescriptionResponse> searchPrescriptionByCode(String token, UUID patientProfileId, String prescriptionCode) {
        PatientProfile patientProfile = patientProfileServices.getPatientProfileById(token, patientProfileId);
        Optional<Prescription> optional = prescriptionRepository
                .findByPatientProfileAndPrescriptionCode(
                        patientProfile,
                        prescriptionCode
                );

        if (optional.isEmpty())
            throw new BadRequestException("Prescription not found", 10026);

        return List.of(new PrescriptionResponse(optional.get()));
    }

    @Override
    public List<MedicineReminderHistoryResponse> getMedicineReminderHistory(String token) {
        Account account = accountServices.findAccountByToken(token);
        List<MedicineReminderHistoryResponse> result = new ArrayList<>();

        for (PatientProfile patientProfile: account.getPatientProfile()) {
            List<MedicineReminder> alreadyReminded = medicineReminderRepository
                    .findByPatientProfileAndEndDateLessThanOrDeletedIsTrue(
                            patientProfile,
                            DateCommon.getStarOfDay(new Date())
                    );
            List<MedicineReminder> workingReminded = medicineReminderRepository
                    .findByPatientProfileAndDeletedIsFalseAndEndDateGreaterThanEqual(
                            patientProfile,
                            DateCommon.getStarOfDay(new Date())
                    );

            if (alreadyReminded.isEmpty() && workingReminded.isEmpty())
                continue;

            List<PrescriptionItemForReminderResponse> usingPrescriptionItems = new ArrayList<>();
            List<PrescriptionItemForReminderResponse> usedPrescriptionItems = new ArrayList<>();

            for (MedicineReminder medicineReminder: alreadyReminded) {
                for (PrescriptionItem prescriptionItem: medicineReminder.getPrescriptionItem().getPrescription().getPrescriptionItems()) {
                    if (prescriptionItem.isDeleted())
                        continue;

                    usedPrescriptionItems.add(
                            PrescriptionItemForReminderResponse.builder()
                                    .prescriptionItem(prescriptionItem)
                                    .build()
                    );
                }
            }

            for (MedicineReminder medicineReminder: workingReminded) {
                PrescriptionItem prescriptionItem = medicineReminder.getPrescriptionItem();

                List<Object[]> medicineReminderDetails = medicineReminderDetailRepository
                        .findGroupedByReminderIndexAndTime(
                                medicineReminder.getMedicineReminderId()
                        );
                List<MedicineDetailsIndexTime> indexTimes = new ArrayList<>();
                for (Object[] objects : medicineReminderDetails) {
                    indexTimes.add(
                            MedicineDetailsIndexTime.builder()
                                    .reminderIndex((int) objects[0])
                                    .reminderTime(objects[1].toString())
                                    .build()
                    );
                }
                usingPrescriptionItems.add(
                        PrescriptionItemForReminderResponse.builder()
                                .prescriptionItem(prescriptionItem)
                                .medicineReminder(new MedicineReminderDetailsResponse(
                                        medicineReminder,
                                        indexTimes
                                ))
                                .build()
                );

            }

            result.add(
                    MedicineReminderHistoryResponse.builder()
                            .patientProfileId(patientProfile.getPatientProfileId().toString())
                            .fullName(patientProfile.getFullName())
                            .usingPrescriptionItems(usingPrescriptionItems)
                            .usedPrescriptionItems(usedPrescriptionItems)
                            .build()
            );
        }

        return result;
    }
}
