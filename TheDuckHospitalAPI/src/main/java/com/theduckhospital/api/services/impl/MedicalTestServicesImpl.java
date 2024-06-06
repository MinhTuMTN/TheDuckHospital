package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.*;
import com.theduckhospital.api.dto.request.PayMedicalTestRequest;
import com.theduckhospital.api.dto.request.headdoctor.AcceptMedicalTestsRequest;
import com.theduckhospital.api.dto.response.MedicalTestResultResponse;
import com.theduckhospital.api.dto.response.PaginationResponse;
import com.theduckhospital.api.dto.response.PatientMedicalTestDetailsResponse;
import com.theduckhospital.api.dto.response.PaymentResponse;
import com.theduckhospital.api.dto.response.doctor.MedicalTestRecordResponse;
import com.theduckhospital.api.dto.response.doctor.SearchMedicalTestResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.MedicalTestRepository;
import com.theduckhospital.api.repository.TransactionRepository;
import com.theduckhospital.api.services.*;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.*;

@Service
public class MedicalTestServicesImpl implements IMedicalTestServices {
    private final IMedicalServiceServices medicalServiceServices;
    private final IBookingServices bookingServices;
    private final IAccountServices accountServices;
    private final MedicalTestRepository medicalTestRepository;
    private final ILaboratoryTechnicianServices laboratoryTechnicianServices;
    private final TransactionRepository transactionRepository;
    private final ICloudinaryServices cloudinaryServices;
    private final IPaymentServices paymentServices;
    private final IPatientServices patientServices;

    public MedicalTestServicesImpl(
            IMedicalServiceServices medicalServiceServices,
            IBookingServices bookingServices, MedicalTestRepository medicalTestRepository,
            TransactionRepository transactionRepository,
            ILaboratoryTechnicianServices laboratoryTechnicianServices,
            ICloudinaryServices cloudinaryServices,
            IAccountServices accountServices,
            IPaymentServices paymentServices,
            IPatientServices patientServices) {
        this.medicalServiceServices = medicalServiceServices;
        this.bookingServices = bookingServices;
        this.accountServices = accountServices;
        this.medicalTestRepository = medicalTestRepository;
        this.transactionRepository = transactionRepository;
        this.cloudinaryServices = cloudinaryServices;
        this.paymentServices = paymentServices;
        this.laboratoryTechnicianServices = laboratoryTechnicianServices;
        this.patientServices = patientServices;
    }

    @Override
    public PaginationResponse getMedicalExaminationTest(
            String patientName,
            MedicalTestState state,
            int serviceId,
            int page,
            int size
    ) {
        MedicalService medicalService = medicalServiceServices.getMedicalServiceById(serviceId);

        if (medicalService.getServiceType() != ServiceType.MedicalTest) {
            throw new BadRequestException("This is not medical test");
        }

        Pageable pageable = PageRequest.of(page, size);

        // Thêm Room
        Page<MedicalTest> medicalTests =
                medicalTestRepository
                        .findByMedicalServiceAndDeletedIsFalseAndMedicalExaminationRecord_PatientProfile_FullNameContainingIgnoreCaseAndStateOrderByQueueNumber(
                                medicalService,
                                patientName,
                                state,
                                pageable
                        );
        List<SearchMedicalTestResponse> searchMedicalTestResponses = new ArrayList<>();
        for (MedicalTest medicalTest : medicalTests.getContent()) {
            SearchMedicalTestResponse medicalTestResponse = new SearchMedicalTestResponse(
                    medicalTest.getMedicalExaminationRecord(),
                    medicalTest
            );
            searchMedicalTestResponses.add(medicalTestResponse);
        }

        return PaginationResponse.builder()
                .items(searchMedicalTestResponses)
                .totalItems((int) medicalTests.getTotalElements())
                .totalPages(medicalTests.getTotalPages())
                .page(page)
                .limit(size)
                .build();
    }

    @Override
    public Map<String, String> countMedicalExaminationTest(int serviceId) {
        MedicalService medicalService = medicalServiceServices.getMedicalServiceById(serviceId);

        if (medicalService.getServiceType() != ServiceType.MedicalTest) {
            throw new BadRequestException("This is not medical test");
        }

        long waiting = medicalTestRepository.countByMedicalServiceAndStateAndDeletedIsFalse(
                medicalService,
                MedicalTestState.WAITING
        );

        long processing = medicalTestRepository.countByMedicalServiceAndStateAndDeletedIsFalse(
                medicalService,
                MedicalTestState.PROCESSING
        );

        return Map.of(
                "waiting", String.valueOf(waiting),
                "processing", String.valueOf(processing)
        );
    }

    @Override
    public long getCurrentQueueNumber(int serviceId) {
        MedicalService medicalService = medicalServiceServices.getMedicalServiceById(serviceId);

        if (medicalService.getServiceType() != ServiceType.MedicalTest) {
            throw new BadRequestException("This is not medical test");
        }

        List<MedicalTest> medicalTests = medicalTestRepository.findByMedicalServiceAndStateOrderByQueueNumberDesc(
                medicalService,
                MedicalTestState.PROCESSING
        );

        if (medicalTests.isEmpty()) {
            return 0;
        }

        return medicalTests.get(0).getQueueNumber();
    }

    @Override
    public List<MedicalTest> acceptMedicalTest(String authorization, AcceptMedicalTestsRequest request) {
        LaboratoryTechnician laboratoryTechnician = laboratoryTechnicianServices.getLaboratoryTechnicianByToken(authorization);
        List<MedicalTest> medicalTests = new ArrayList<>();
        for (UUID medicalTestId : request.getMedicalTestIds()) {
            MedicalTest medicalTest = getMedicalTestById(medicalTestId);
            medicalTest.setLaboratoryTechnician(laboratoryTechnician);
            medicalTests.add(updateStateMedicalTest(
                    medicalTest,
                    MedicalTestState.PROCESSING
            ));
        }
        return medicalTests;
    }

    private MedicalTest updateStateMedicalTest(
            MedicalTest medicalTest,
            MedicalTestState state
    ) {

        medicalTest.setState(state);
        medicalTestRepository.save(medicalTest);

        return medicalTest;
    }

    private MedicalTest getMedicalTestById(UUID medicalTestId) {
        Optional<MedicalTest> optional = medicalTestRepository.findById(medicalTestId);

        if (optional.isEmpty()) {
            throw new NotFoundException("Not found medical test");
        }
        return optional.get();
    }

    @Override
    public MedicalTestRecordResponse getMedicalTestRecordById(UUID medicalTestId) {
        MedicalTest medicalTest = getMedicalTestById(medicalTestId);
        MedicalExaminationRecord examinationRecord = medicalTest.getMedicalExaminationRecord();

        return new MedicalTestRecordResponse(examinationRecord, medicalTest);
    }

    @Override
    public MedicalTest completeMedicalTest(UUID medicalTestId, MultipartFile file) {
        MedicalTest medicalTest = getMedicalTestById(medicalTestId);
        String url = cloudinaryServices.uploadFile(file);
        if (url.isEmpty()) {
            throw new BadRequestException("Đã có lỗi xảy ra");
        }
        medicalTest.setResultFileUrl(url);

        return updateStateMedicalTest(medicalTest, MedicalTestState.DONE);
    }

    @Override
    public PatientMedicalTestDetailsResponse patientGetMedicalTestDetails(String medicalTestCode) {
        Optional<MedicalTest> optional = medicalTestRepository
                .findByMedicalTestCodeAndDeletedIsFalse(
                        medicalTestCode
                );

        if (optional.isEmpty()) {
            throw new BadRequestException("Not found medical test", 10010);
        }

        MedicalTest medicalTest = optional.get();

        if (medicalTest.getTransaction() != null &&
                medicalTest.getTransaction().getStatus() == TransactionStatus.SUCCESS
        ) {
            throw new BadRequestException("This medical test has been paid", 10011);
        }

        return new PatientMedicalTestDetailsResponse(
                medicalTest.getMedicalExaminationRecord().getPatientProfile(),
                medicalTest
        );
    }

    @Override
    @Transactional
    public PaymentResponse patientPayMedicalTest(String token, PayMedicalTestRequest request, String origin) {
        try {
            Optional<MedicalTest> optional = medicalTestRepository
                    .findByMedicalTestCodeAndDeletedIsFalse(
                            request.getMedicalTestCode()
                    );

            if (optional.isEmpty()) {
                throw new BadRequestException("Not found medical test", 10010);
            }
            MedicalTest medicalTest = optional.get();
            if (medicalTest.getTransaction() != null &&
                    medicalTest.getTransaction().getStatus() == TransactionStatus.SUCCESS
            ) {
                throw new BadRequestException("This medical test has been paid", 10011);
            }

            int totalAmount = (int) (medicalTest.getMedicalService().getPrice() + MomoConfig.medicalTestFee);
            Transaction transaction = getTransaction(token, origin, medicalTest);
            transactionRepository.save(transaction);

            UUID oldTransactionId = medicalTest.getTransaction() != null ?
                    medicalTest.getTransaction().getTransactionId() : null;
            medicalTest.setTransaction(transaction);
            medicalTestRepository.save(medicalTest);

            if (oldTransactionId != null) {
                transactionRepository.deleteById(oldTransactionId);
            }

            transaction.setMedicalTest(medicalTest);
            return paymentServices.createMedicalTestPaymentUrl(transaction, request);
        } catch (BadRequestException e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new BadRequestException(e.getMessage(), e.getErrorCode() == 0 ? 400 : e.getErrorCode());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new BadRequestException("Error when pay medical test", 400);
        }
    }

    @Override
    public List<MedicalService> patientGetMedicalTests() {
        return medicalServiceServices.doctorGetAllMedicalTests();
    }

    @Override
    public List<MedicalTestResultResponse> patientGetMedicalTestResults(
            String patientCode,
            Date fromDate,
            Date toDate,
            String sort,
            int serviceId
    ) {
        Calendar fromDateCalendar = DateCommon.getCalendar(fromDate);
        Calendar toDateCalendar = DateCommon.getCalendar(DateCommon.getEndOfDay(toDate));

        Patient patient = patientServices.findPatientByPatientCode(patientCode);

        List<MedicalTest> medicalTests = patient.getMedicalExaminationRecords().stream()
                .flatMap(record -> record.getMedicalTest().stream())
                .filter(test -> test.getDate().compareTo(fromDateCalendar.getTime()) >= 0 &&
                        test.getDate().compareTo(toDateCalendar.getTime()) <= 0)
                .filter(test -> (serviceId == -1 || test.getMedicalService().getServiceId() == serviceId))
                .sorted(sort.equals("ASC") ? Comparator.comparing(MedicalTest::getDate) :
                        Comparator.comparing(MedicalTest::getDate).reversed())
                .toList();

        List<MedicalTestResultResponse> medicalTestResultList = new ArrayList<>();
        for (MedicalTest test : medicalTests) {
            MedicalTestResultResponse medicalTestResultResponse = new MedicalTestResultResponse(
                    test.getMedicalExaminationRecord().getDoctorSchedule().getDoctor(),
                    test.getLaboratoryTechnician(),
                    test.getMedicalService(),
                    test);
            medicalTestResultList.add(medicalTestResultResponse);
        }
        return medicalTestResultList;
    }

    @NotNull
    private Transaction getTransaction(String token, String origin, MedicalTest medicalTest) {
        Account account = accountServices.findAccountByToken(token);

        Transaction transaction = new Transaction();
        transaction.setAccount(account);
        transaction.setAmount(medicalTest.getMedicalService().getPrice() + MomoConfig.medicalTestFee);
        transaction.setOrigin(origin);
        transaction.setPaymentType(PaymentType.MEDICAL_TEST);
        return transaction;
    }
}
