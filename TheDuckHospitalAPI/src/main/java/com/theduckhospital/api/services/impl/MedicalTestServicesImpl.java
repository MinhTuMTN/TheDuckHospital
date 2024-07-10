package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.*;
import com.theduckhospital.api.dto.request.PayMedicalTestRequest;
import com.theduckhospital.api.dto.request.doctor.CompleteMedicalTest;
import com.theduckhospital.api.dto.request.doctor.CreateMedicalTest;
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
import com.theduckhospital.api.repository.RoomRepository;
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
    private final MedicalTestRepository medicalTestRepository;
    private final ILaboratoryTechnicianServices laboratoryTechnicianServices;
    private final ICloudinaryServices cloudinaryServices;
    private final IPaymentServices paymentServices;
    private final IPatientServices patientServices;
    private final IRoomServices roomServices;
    private final RoomRepository roomRepository;

    public MedicalTestServicesImpl(
            IMedicalServiceServices medicalServiceServices,
            MedicalTestRepository medicalTestRepository,
            ILaboratoryTechnicianServices laboratoryTechnicianServices,
            ICloudinaryServices cloudinaryServices,
            IPaymentServices paymentServices,
            IPatientServices patientServices,
            IRoomServices roomServices,
            RoomRepository roomRepository) {
        this.medicalServiceServices = medicalServiceServices;
        this.medicalTestRepository = medicalTestRepository;
        this.cloudinaryServices = cloudinaryServices;
        this.paymentServices = paymentServices;
        this.laboratoryTechnicianServices = laboratoryTechnicianServices;
        this.patientServices = patientServices;
        this.roomServices = roomServices;
        this.roomRepository = roomRepository;
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
    public boolean completeMedicalTest(UUID medicalTestId, CompleteMedicalTest request) throws IOException {
//        MedicalTest medicalTest = getMedicalTestById(medicalTestId);
        updateMedicalTestResultAsync(medicalTestId, request.getFile().getBytes(), request.getTestResult());
        return true;
    }

    private void updateMedicalTestResultAsync(UUID medicalTestId, Object file, String testResult) {
        CompletableFuture.runAsync(() -> {
            try {
                MedicalTest medicalTest = getMedicalTestById(medicalTestId);
                System.out.println(medicalTest.getQueueNumber());
                String url = cloudinaryServices.uploadFile(file);

                System.out.println(url);
                medicalTest.setResultFileUrl(url);
                medicalTest.setTestResult(testResult);

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
    public PaymentResponse patientPayMedicalTest(PayMedicalTestRequest request, String origin) {
        try {
            Transaction transaction = paymentServices
                    .createMedicalTestTransaction(
                            request,
                            origin,
                            null
                    );

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

        return getMedicalTestResultResponses(medicalTests);
    }

    @NotNull
    private static List<MedicalTestResultResponse> getMedicalTestResultResponses(List<MedicalTest> medicalTests) {
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
        long waiting = medicalTestRepository.countByRoomAndStateAndDeletedIsFalse(
                room,
                MedicalTestState.WAITING
        );

        return Map.of("processing", String.valueOf(processing),
                "waiting", String.valueOf(waiting)
        );
    }

    @Override
    public MedicalTest createMedicalTest(
            CreateMedicalTest request,
            MedicalExaminationRecord examinationRecord,
            HospitalAdmission hospitalAdmission
    ) {
        Date today = DateCommon.getToday();
        MedicalService medicalService = medicalServiceServices
                .getMedicalServiceByIdAndServiceType(
                        request.getServiceId(),
                        ServiceType.MedicalTest
                );

        MedicalTest medicalTest = new MedicalTest();
        medicalTest.setMedicalService(medicalService);
        medicalTest.setMedicalExaminationRecord(examinationRecord);
        medicalTest.setHospitalAdmission(hospitalAdmission);
        medicalTest.setNote(
                request.getNote()
        );
        medicalTest.setPrice(
                medicalService.getPrice()
        );

        // Thay đổi
        // B1: Tìm ra phòng có số lượng ít nhất mà xét nghiệm dịch vụ đó
        // B2: Lấy số thứ tự + 1
        Pageable pageable = PageRequest.of(0, 1);
        Page<Room> roomPage = roomRepository.findLaboratoryRoom(
                medicalService,
                hospitalAdmission != null
                        ? RoomType.LABORATORY_ROOM_ADMISSION
                        : RoomType.LABORATORY_ROOM_NORMAL,
                pageable
        );
        if (roomPage.getContent().isEmpty())
            throw new NotFoundException("Laboratory Room not found");
        Room laboratoryRoom = roomPage.getContent().get(0);
        int currentQueueNumber = laboratoryRoom.getMedicalTestQueueNumberMax();
        medicalTest.setQueueNumber(
                currentQueueNumber + 1
        );
        medicalTest.setRoom(laboratoryRoom);
        laboratoryRoom.setMedicalTestQueueNumberMax(
                currentQueueNumber + 1
        );
        medicalTest.setDate(today);

        roomRepository.save(laboratoryRoom);
        medicalTestRepository.save(medicalTest);

        return medicalTest;
    }

    @Override
    public Page<MedicalTest> getMedicalTestsByHospitalAdmission(
            HospitalAdmission hospitalAdmission,
            int serviceId,
            int page,
            int size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        if (serviceId > 0) {
            MedicalService medicalService = medicalServiceServices
                    .getMedicalServiceById(serviceId);
            return medicalTestRepository
                    .findByHospitalAdmissionAndMedicalServiceAndDeletedIsFalseOrderByDateDesc(
                    hospitalAdmission,
                    medicalService,
                    pageable
            );
        }
        return medicalTestRepository.findByHospitalAdmissionAndDeletedIsFalseOrderByDateDesc(
                hospitalAdmission,
                pageable
        );
    }

    @Override
    public void deleteHospitalAdmissionMedicalTest(
            HospitalAdmission hospitalAdmission,
            UUID medicalTestId
    ) {
        MedicalTest medicalTest = getMedicalTestById(medicalTestId);
        if (medicalTest.getHospitalAdmission() == null ||
                !medicalTest.getHospitalAdmission().equals(hospitalAdmission)
        ) {
            throw new BadRequestException("Invalid hospital admission", 400);
        }

        // Completed medical test cannot be deleted
        if (medicalTest.getState() == MedicalTestState.DONE) {
            throw new BadRequestException("Completed medical test cannot be deleted", 3001);
        }

        // Paid medical test cannot be deleted
        if (medicalTest.getTransaction() != null &&
                medicalTest.getTransaction().getStatus() == TransactionStatus.SUCCESS
        ) {
            throw new BadRequestException("Paid medical test cannot be deleted", 3000);
        }


        medicalTest.setDeleted(true);
        medicalTestRepository.save(medicalTest);
    }

    @Override
    public List<MedicalTest> getMedicalTestsByHospitalAdmissionAndDate(
            HospitalAdmission hospitalAdmission,
            Date date
    ) {
        Date startDate = DateCommon.getStarOfDay(date);
        Date endDate = DateCommon.getEndOfDay(date);
        return medicalTestRepository
                .findByHospitalAdmissionAndDateBetweenAndDeletedIsFalse(
                        hospitalAdmission,
                        startDate,
                        endDate
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
}
