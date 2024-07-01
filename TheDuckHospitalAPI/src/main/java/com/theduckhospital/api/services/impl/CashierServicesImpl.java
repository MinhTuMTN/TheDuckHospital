package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.*;
import com.theduckhospital.api.dto.request.PayMedicalTestRequest;
import com.theduckhospital.api.dto.request.cashier.CashierPaymentRequest;
import com.theduckhospital.api.dto.response.PaymentResponse;
import com.theduckhospital.api.dto.response.cashier.BillDetailsResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.HospitalAdmissionRepository;
import com.theduckhospital.api.repository.MedicalTestRepository;
import com.theduckhospital.api.services.IAccountServices;
import com.theduckhospital.api.services.ICashierServices;
import com.theduckhospital.api.services.IPaymentServices;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class CashierServicesImpl implements ICashierServices {
    private final MedicalTestRepository medicalTestRepository;
    private final HospitalAdmissionRepository hospitalAdmissionRepository;
    private final IPaymentServices paymentServices;
    private final IAccountServices accountServices;

    public CashierServicesImpl(
            MedicalTestRepository medicalTestRepository,
            HospitalAdmissionRepository hospitalAdmissionRepository,
            IPaymentServices paymentServices,
            IAccountServices accountServices
    ) {
        this.medicalTestRepository = medicalTestRepository;
        this.hospitalAdmissionRepository = hospitalAdmissionRepository;
        this.paymentServices = paymentServices;
        this.accountServices = accountServices;
    }

    @Override
    public BillDetailsResponse getPaymentDetails(String paymentCode) {
        PatientProfile patientProfile;
        String code;
        UUID id;
        double amount = 0;
        Date date;
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

            MedicalExaminationRecord medicalExaminationRecord = medicalTest.getMedicalExaminationRecord();
            if (medicalExaminationRecord == null) {
                patientProfile = medicalTest.getHospitalAdmission().getPatientProfile();
            } else {
                patientProfile = medicalExaminationRecord.getPatientProfile();
            }
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

    @Override
    public PaymentResponse createPayment(String token, CashierPaymentRequest request, String origin) {
        if (request.getPaymentMethod() == PaymentMethod.WALLET) {
            throw new BadRequestException("Payment method not supported", 10013);
        }

        Cashier cashier = findCashierByToken(token);
        String paymentCode = request.getPaymentCode();
        PayMedicalTestRequest payMedicalTestRequest = PayMedicalTestRequest
                .builder()
                .medicalTestCode(paymentCode)
                .paymentMethod(request.getPaymentMethod())
                .build();
        if (paymentCode.startsWith("MT")) {
            Transaction transaction = paymentServices
                    .createMedicalTestTransaction(
                            payMedicalTestRequest,
                            origin,
                            cashier
                    );

            return paymentServices
                    .createMedicalTestPaymentUrl(
                            transaction,
                            payMedicalTestRequest
                    );
        } else if (paymentCode.startsWith("HA")) {
            Transaction transaction = paymentServices
                    .createHospitalAdmissionTransaction(
                            payMedicalTestRequest,
                            origin,
                            cashier
                    );

            return paymentServices
                    .createHospitalAdmissionPaymentUrl(
                            transaction,
                            payMedicalTestRequest
                    );
        }
        return null;
    }

    @Override
    public Cashier findCashierByToken(String token) {
        Account account = accountServices.findAccountByToken(token);
        if (account.getStaff() == null)
            throw new NotFoundException("Cashier not found");

        Staff staff = account.getStaff();
        if (!(staff instanceof Cashier))
            throw new NotFoundException("Cashier not found");

        return (Cashier) staff;
    }
}
