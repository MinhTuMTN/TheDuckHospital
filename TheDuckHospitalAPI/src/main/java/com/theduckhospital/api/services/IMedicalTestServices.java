package com.theduckhospital.api.services;

import com.theduckhospital.api.constant.MedicalTestState;
import com.theduckhospital.api.dto.request.PayMedicalTestRequest;
import com.theduckhospital.api.dto.request.headdoctor.AcceptMedicalTestsRequest;
import com.theduckhospital.api.dto.response.*;
import com.theduckhospital.api.dto.response.doctor.MedicalTestRecordResponse;
import com.theduckhospital.api.entity.MedicalService;
import com.theduckhospital.api.entity.MedicalTest;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface IMedicalTestServices {
    PaginationResponse getMedicalExaminationTest(String patientName, MedicalTestState state, int serviceId, int page, int size);

    Map<String, String> countMedicalExaminationTest(int serviceId);

    long getCurrentQueueNumber(int serviceId);

    List<MedicalTest> acceptMedicalTest(String authorization, AcceptMedicalTestsRequest request);

    MedicalTestRecordResponse getMedicalTestRecordById(UUID medicalTestId);

    MedicalTest completeMedicalTest(UUID medicalTestId, MultipartFile file);

    PatientMedicalTestDetailsResponse patientGetMedicalTestDetails(String medicalTestCode);

    PaymentResponse patientPayMedicalTest(String token, PayMedicalTestRequest request, String origin);

    List<MedicalService> patientGetMedicalTests();

    List<MedicalTestResultResponse> patientGetMedicalTestResults(
            String patientCode,
            Date fromDate,
            Date toDate,
            String sort,
            int serviceId
    );
}
