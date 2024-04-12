package com.theduckhospital.api.services;

import com.theduckhospital.api.constant.MedicalTestState;
import com.theduckhospital.api.dto.request.PayMedicalTestRequest;
import com.theduckhospital.api.dto.request.headdoctor.AcceptMedicalTestsRequest;
import com.theduckhospital.api.dto.response.PaginationResponse;
import com.theduckhospital.api.dto.response.PatientMedicalTestDetailsResponse;
import com.theduckhospital.api.dto.response.PaymentResponse;
import com.theduckhospital.api.dto.response.doctor.MedicalTestRecordResponse;
import com.theduckhospital.api.entity.MedicalTest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface IMedicalTestServices {
    PaginationResponse getMedicalExaminationTest(
            String patientName,
            MedicalTestState state,
            int serviceId,
            int page,
            int size
    );

    Map<String, String> countMedicalExaminationTest(int serviceId);

    long getCurrentQueueNumber(int serviceId);

    List<MedicalTest> acceptMedicalTest(AcceptMedicalTestsRequest request);

    MedicalTestRecordResponse getMedicalTestRecordById(UUID medicalTestId);

    MedicalTest completeMedicalTest(UUID medicalTestId, MultipartFile file);
    PatientMedicalTestDetailsResponse patientGetMedicalTestDetails(
            String medicalTestCode
    );
    PaymentResponse patientPayMedicalTest(
            String token,
            PayMedicalTestRequest request,
            String origin
    );
}
