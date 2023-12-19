package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.MedicalTestState;
import com.theduckhospital.api.constant.ServiceType;
import com.theduckhospital.api.dto.request.headdoctor.AcceptMedicalTestsRequest;
import com.theduckhospital.api.dto.response.PaginationResponse;
import com.theduckhospital.api.dto.response.doctor.MedicalTestRecordResponse;
import com.theduckhospital.api.dto.response.doctor.SearchMedicalTestResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.MedicalTestRepository;
import com.theduckhospital.api.services.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class MedicalTestServicesImpl implements IMedicalTestServices {
    private final IMedicalServiceServices medicalServiceServices;
    private final MedicalTestRepository medicalTestRepository;
    private final ICloudinaryServices cloudinaryServices;

    public MedicalTestServicesImpl(
            IMedicalServiceServices medicalServiceServices,
            MedicalTestRepository medicalTestRepository,
            ICloudinaryServices cloudinaryServices
    ) {
        this.medicalServiceServices = medicalServiceServices;
        this.medicalTestRepository = medicalTestRepository;
        this.cloudinaryServices = cloudinaryServices;
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

        if(medicalService.getServiceType() != ServiceType.MedicalTest) {
            throw new BadRequestException("This is not medical test");
        }

        Pageable pageable = PageRequest.of(page, size);
        Page<MedicalTest> medicalTests =
                medicalTestRepository
                        .findByMedicalServiceAndDeletedIsFalseAndMedicalExaminationRecord_PatientProfile_FullNameContainingIgnoreCaseAndStateOrderByQueueNumber(
                                medicalService,
                                patientName,
                                state,
                                pageable
                        );
        List<SearchMedicalTestResponse> searchMedicalTestResponses = new ArrayList<>();
        for(MedicalTest medicalTest : medicalTests.getContent()) {
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

        if(medicalService.getServiceType() != ServiceType.MedicalTest) {
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

        if(medicalService.getServiceType() != ServiceType.MedicalTest) {
            throw new BadRequestException("This is not medical test");
        }

        List<MedicalTest> medicalTests = medicalTestRepository.findByMedicalServiceAndStateOrderByQueueNumberDesc(
                medicalService,
                MedicalTestState.PROCESSING
        );

        if(medicalTests.isEmpty()) {
            return 0;
        }

        return medicalTests.get(0).getQueueNumber();
    }

    @Override
    public List<MedicalTest> acceptMedicalTest(AcceptMedicalTestsRequest request) {
        List<MedicalTest> medicalTests = new ArrayList<>();
        for (UUID medicalTestId : request.getMedicalTestIds()) {
            MedicalTest medicalTest = getMedicalTestById(medicalTestId);
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

        if(optional.isEmpty()) {
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
}
