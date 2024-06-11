package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.*;
import com.theduckhospital.api.dto.request.PayMedicalTestRequest;
import com.theduckhospital.api.dto.request.headdoctor.AcceptMedicalTestsRequest;
import com.theduckhospital.api.dto.response.MedicalTestResultResponse;
import com.theduckhospital.api.dto.response.PaginationResponse;
import com.theduckhospital.api.dto.response.PatientMedicalTestDetailsResponse;
import com.theduckhospital.api.dto.response.PaymentResponse;
import com.theduckhospital.api.dto.response.doctor.LabRoomResponse;
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
import java.util.*;
import java.util.concurrent.CompletableFuture;

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
    private final IRoomServices roomServices;

    public MedicalTestServicesImpl(
            IMedicalServiceServices medicalServiceServices,
            IBookingServices bookingServices, MedicalTestRepository medicalTestRepository,
            TransactionRepository transactionRepository,
            ILaboratoryTechnicianServices laboratoryTechnicianServices,
            ICloudinaryServices cloudinaryServices,
            IAccountServices accountServices,
            IPaymentServices paymentServices,
            IPatientServices patientServices, IRoomServices roomServices) {
        this.medicalServiceServices = medicalServiceServices;
        this.bookingServices = bookingServices;
        this.accountServices = accountServices;
        this.medicalTestRepository = medicalTestRepository;
        this.transactionRepository = transactionRepository;
        this.cloudinaryServices = cloudinaryServices;
        this.paymentServices = paymentServices;
        this.laboratoryTechnicianServices = laboratoryTechnicianServices;
        this.patientServices = patientServices;
        this.roomServices = roomServices;
    }

    @Override
    public MedicalTest acceptMedicalTest(String authorization, UUID medicalTestId) {
        if (medicalTestId == null) {
            throw new BadRequestException("Invalid medical test id", 400);
        }

        LaboratoryTechnician laboratoryTechnician = laboratoryTechnicianServices.getLaboratoryTechnicianByToken(authorization);
        MedicalTest medicalTest = getMedicalTestById(medicalTestId);

        if (medicalTest.getState() != MedicalTestState.WAITING) {
            throw new BadRequestException("Invalid medical test state", 400);
        }

        medicalTest.setLaboratoryTechnician(laboratoryTechnician);
        return updateStateMedicalTest(medicalTest, MedicalTestState.PROCESSING);
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
    public boolean completeMedicalTest(UUID medicalTestId, MultipartFile file) throws IOException {
        MedicalTest medicalTest = getMedicalTestById(medicalTestId);
        updateMedicalTestResultAsync(medicalTestId, file.getBytes());
        return true;
    }

    private void updateMedicalTestResultAsync(UUID medicalTestId, Object file) {
        CompletableFuture.runAsync(() -> {
            try {
                MedicalTest medicalTest = getMedicalTestById(medicalTestId);
                String url = cloudinaryServices.uploadFile(file);
                medicalTest.setResultFileUrl(url);
                medicalTestRepository.save(medicalTest);

                updateStateMedicalTest(medicalTest, MedicalTestState.DONE);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
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

            UUID oldTransactionId = medicalTest.getTransaction() != null ?
                    medicalTest.getTransaction().getTransactionId() : null;
            if (oldTransactionId != null)
                transactionRepository.deleteById(oldTransactionId);

            Transaction transaction = getTransaction(token, origin, medicalTest);
            transaction.setMedicalTest(medicalTest);
            transactionRepository.save(transaction);

            medicalTest.setTransaction(transaction);
            medicalTestRepository.save(medicalTest);

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

    @Override
    public List<LabRoomResponse> getLabRooms(RoomType roomType) {
        if (roomType != RoomType.LABORATORY_ROOM_NORMAL &&
                roomType != RoomType.LABORATORY_ROOM_ADMISSION
        ) {
            throw new BadRequestException("Invalid room type", 400);
        }

        return roomServices.getRoomsByType(
                List.of(roomType)
        ).stream()
                .map(LabRoomResponse::new)
                .toList();
    }

    @Override
    public PaginationResponse getMedicalTestsByRoomId(
            Integer roomId,
            String search,
            MedicalTestState state,
            int page,
            int size
    ) {
        Room room = getLabRoomById(roomId);

        Pageable pageable = PageRequest.of(page, size);
        Page<MedicalTest> medicalTests = medicalTestRepository
                .findByRoomAndStateAndDeletedIsFalseOrderByQueueNumber(
                        room,
                        search,
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
    public Map<String, String> getNextQueueNumber(Integer roomId) {
        Room room = getLabRoomById(roomId);
        if (room.getMedicalTestQueueNumber() >= room.getMedicalTestQueueNumberMax()) {
            throw new BadRequestException("No more patient", 10050);
        }

        int nextNumber = Math.min(room.getMedicalTestQueueNumber() + 5, room.getMedicalTestQueueNumberMax());
        room.setMedicalTestQueueNumber(nextNumber);
        roomServices.saveRoom(room);

        return Map.of("current", String.valueOf(nextNumber),
                "total", String.valueOf(room.getMedicalTestQueueNumberMax())
        );
    }

    @Override
    public Map<String, String> getRoomCounter(Integer roomId) {
        Room room = getLabRoomById(roomId);
        long processing = medicalTestRepository.countByRoomAndStateAndDeletedIsFalse(
                room,
                MedicalTestState.PROCESSING
        );
        long waiting = room.getMedicalTestQueueNumberMax() - processing;

        return Map.of("processing", String.valueOf(processing),
                "waiting", String.valueOf(waiting)
        );
    }

    private Room getLabRoomById(Integer roomId) {
        if (roomId == null) {
            throw new BadRequestException("Invalid room id", 400);
        }
        Room room = roomServices.findRoomById(roomId);
        if (room.getRoomType() != RoomType.LABORATORY_ROOM_NORMAL &&
                room.getRoomType() != RoomType.LABORATORY_ROOM_ADMISSION
        ) {
            throw new BadRequestException("Invalid room type", 400);
        }

        return room;
    }

    @NotNull
    private Transaction getTransaction(String token, String origin, MedicalTest medicalTest) {
        Account account = accountServices.findAccountByToken(token);

        Transaction transaction = new Transaction();
        transaction.setAccount(account);
        transaction.setAmount(medicalTest.getMedicalService().getPrice());
        transaction.setFee((double) MomoConfig.medicalTestFee);
        transaction.setOrigin(origin);
        transaction.setPaymentType(PaymentType.MEDICAL_TEST);
        return transaction;
    }
}
