package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.PaymentType;
import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.dto.response.cashier.BillDetailsResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.MedicalTestRepository;
import com.theduckhospital.api.services.ICashierServices;
import com.theduckhospital.api.services.IMedicalTestServices;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Optional;

@Service
public class CashierServicesImpl implements ICashierServices {
    private final MedicalTestRepository medicalTestRepository;

    public CashierServicesImpl(MedicalTestRepository medicalTestRepository) {
        this.medicalTestRepository = medicalTestRepository;
    }

    @Override
    public BillDetailsResponse getPaymentDetails(String paymentCode) {
        if (paymentCode.startsWith("MT")) {
            Optional<MedicalTest> optional = medicalTestRepository
                    .findByMedicalTestCodeAndDeletedIsFalse(paymentCode);
            if (optional.isEmpty())
                throw new NotFoundException("Medical test not found");

            MedicalTest medicalTest = optional.get();
            if (medicalTest.getTransaction() != null && medicalTest.getTransaction().getStatus() == TransactionStatus.SUCCESS) {
                throw new BadRequestException("Medical test has been paid", 10011);
            }

            PatientProfile patientProfile = medicalTest.getMedicalExaminationRecord().getPatientProfile();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(patientProfile.getDateOfBirth());
            int yearOfBirth = calendar.get(Calendar.YEAR);

            return BillDetailsResponse.builder()
                    .code(medicalTest.getMedicalTestCode())
                    .id(medicalTest.getMedicalTestId())
                    .patientName(patientProfile.getFullName())
                    .yearOfBirth(yearOfBirth)
                    .date(medicalTest.getDate())
                    .phoneNumber("********" + patientProfile.getPhoneNumber().substring(7))
                    .amount(medicalTest.getPrice())
                    .paymentType(PaymentType.MEDICAL_TEST)
                    .note(medicalTest.getNote())
                    .build();
        }

        return null;
    }
}
