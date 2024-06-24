package com.theduckhospital.api.services;

import com.theduckhospital.api.constant.MedicalTestState;
import com.theduckhospital.api.constant.RoomType;
import com.theduckhospital.api.dto.request.PayMedicalTestRequest;
import com.theduckhospital.api.dto.request.doctor.CompleteMedicalTest;
import com.theduckhospital.api.dto.request.doctor.CreateMedicalTest;
import com.theduckhospital.api.dto.request.headdoctor.AcceptMedicalTestsRequest;
import com.theduckhospital.api.dto.response.*;
import com.theduckhospital.api.dto.response.doctor.LabRoomResponse;
import com.theduckhospital.api.dto.response.doctor.MedicalTestRecordResponse;
import com.theduckhospital.api.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface IMedicalTestServices {
    MedicalTest acceptMedicalTest(String authorization, UUID medicalTestId);
    MedicalTestRecordResponse getMedicalTestRecordById(UUID medicalTestId);
    boolean completeMedicalTest(UUID medicalTestId, CompleteMedicalTest request) throws IOException;
    PatientMedicalTestDetailsResponse patientGetMedicalTestDetails(String medicalTestCode);
    PaymentResponse patientPayMedicalTest(PayMedicalTestRequest request, String origin);
    List<MedicalService> patientGetMedicalTests();
    List<MedicalTestResultResponse> patientGetMedicalTestResults(
            String patientCode,
            Date fromDate,
            Date toDate,
            String sort,
            int serviceId
    );
    List<LabRoomResponse> getLabRooms(RoomType roomType);
    PaginationResponse getMedicalTestsByRoomId(
            Integer roomId,
            String search,
            MedicalTestState state,
            int page,
            int size
    );
    Map<String, String> getNextQueueNumber(Integer roomId);
    Map<String, String> getRoomCounter(Integer roomId);
    MedicalTest createMedicalTest(
            CreateMedicalTest request,
            MedicalExaminationRecord examinationRecord,
            HospitalAdmission hospitalAdmission
    );
    Page<MedicalTest> getMedicalTestsByHospitalAdmission(
            HospitalAdmission hospitalAdmission,
            int page,
            int size
    );
    void deleteHospitalAdmissionMedicalTest(
            HospitalAdmission hospitalAdmission,
            UUID medicalTestId
    );
}
