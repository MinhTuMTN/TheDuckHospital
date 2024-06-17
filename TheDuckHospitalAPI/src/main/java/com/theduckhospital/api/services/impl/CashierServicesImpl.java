package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.Fee;
import com.theduckhospital.api.constant.HospitalAdmissionState;
import com.theduckhospital.api.constant.PaymentType;
import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.dto.response.cashier.BillDetailsResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.HospitalAdmissionRepository;
import com.theduckhospital.api.repository.MedicalTestRepository;
import com.theduckhospital.api.services.ICashierServices;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class CashierServicesImpl implements ICashierServices {
    private final MedicalTestRepository medicalTestRepository;
    private final HospitalAdmissionRepository hospitalAdmissionRepository;

    public CashierServicesImpl(
            MedicalTestRepository medicalTestRepository,
            HospitalAdmissionRepository hospitalAdmissionRepository
    ) {
        this.medicalTestRepository = medicalTestRepository;
        this.hospitalAdmissionRepository = hospitalAdmissionRepository;
    }

    @Override
    public BillDetailsResponse getPaymentDetails(String paymentCode) {
        PatientProfile patientProfile;
        String code;
        UUID id;
        double amount = 0;
        Date date = new Date();
        PaymentType paymentType;
        String note = "";
        if (paymentCode.startsWith("MT")) {
            Optional<MedicalTest> optional = medicalTestRepository
                    .findByMedicalTestCodeAndDeletedIsFalse(paymentCode);
            if (optional.isEmpty())
                throw new NotFoundException("Medical test not found");

            MedicalTest medicalTest = optional.get();
            if (medicalTest.getTransaction() != null && medicalTest.getTransaction().getStatus() == TransactionStatus.SUCCESS) {
                throw new BadRequestException("Medical test has been paid", 10011);
            }

            patientProfile = medicalTest.getMedicalExaminationRecord().getPatientProfile();
            id = medicalTest.getMedicalTestId();
            code = medicalTest.getMedicalTestCode();
            amount = medicalTest.getPrice();
            date = medicalTest.getDate();
            note = medicalTest.getNote();
            paymentType = PaymentType.MEDICAL_TEST;
        } else if (paymentCode.startsWith("HA")) {
            Optional<HospitalAdmission> optional = hospitalAdmissionRepository
                    .findByHospitalAdmissionCodeAndDeletedIsFalse(paymentCode);
            if (optional.isEmpty()) {
                throw new NotFoundException("Hospital admission not found");
            }


            HospitalAdmission hospitalAdmission = optional.get();
            if (hospitalAdmission.getState() != HospitalAdmissionState.WAITING_FOR_PAYMENT) {
                throw new BadRequestException("Hospital admission has been paid", 10012);
            }

            patientProfile = hospitalAdmission.getPatientProfile();
            id = hospitalAdmission.getHospitalAdmissionId();
            code = hospitalAdmission.getHospitalAdmissionCode();
            amount = Fee.HOSPITAL_ADMISSION_FEE;
            date = hospitalAdmission.getAdmissionDate();
            paymentType = PaymentType.ADVANCE_FEE;
        } else {
            return null;
        }

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(patientProfile.getDateOfBirth());
        int yearOfBirth = calendar.get(Calendar.YEAR);

        return BillDetailsResponse.builder()
                .code(code)
                .id(id)
                .patientName(patientProfile.getFullName())
                .yearOfBirth(yearOfBirth)
                .date(date)
                .phoneNumber("********" + patientProfile.getPhoneNumber().substring(7))
                .amount(amount)
                .paymentType(paymentType)
                .note(note)
                .build();
    }
}
