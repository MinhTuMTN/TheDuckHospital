package com.theduckhospital.api.controller.doctor;

import com.theduckhospital.api.constant.MedicalTestState;
import com.theduckhospital.api.dto.request.headdoctor.AcceptMedicalTestsRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IMedicalServiceServices;
import com.theduckhospital.api.services.IMedicalTestServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/api/doctor/medical-tests")
@PreAuthorize("hasAnyRole('ROLE_DOCTOR', 'ROLE_HEAD_DOCTOR', 'ROLE_LABORATORY_TECHNICIAN')")
public class MedicalTestController {
    private final IMedicalServiceServices medicalServiceServices;
    private final IMedicalTestServices medicalTestServices;

    public MedicalTestController(IMedicalServiceServices medicalServiceServices,
                                 IMedicalTestServices medicalTestServices
    ) {
        this.medicalServiceServices = medicalServiceServices;
        this.medicalTestServices = medicalTestServices;
    }

    @GetMapping
    public ResponseEntity<?> getAllMedicalTests() {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalServiceServices.doctorGetAllMedicalTests())
                        .build()
        );
    }

    @GetMapping("/medical-service")
    public ResponseEntity<?> searchMedicalTestsByMedicalServiceAndState(
            @RequestParam(defaultValue = "") String searchString,
            @RequestParam int serviceId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam MedicalTestState state
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalTestServices.getMedicalExaminationTest(
                                searchString,
                                state,
                                serviceId,
                                page,
                                size))
                        .build()
        );
    }

    @GetMapping("/count")
    public ResponseEntity<?> countMedicalExaminationRecord(
            @RequestParam int serviceId
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalTestServices.countMedicalExaminationTest(serviceId))
                        .build()
        );
    }

    @GetMapping("/current-queue-number")
    public ResponseEntity<?> getCurrentQueueNumber(
            @RequestParam int serviceId
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalTestServices.getCurrentQueueNumber(serviceId))
                        .build()
        );
    }

    @PutMapping("/accept")
    public ResponseEntity<?> acceptMedicalTest(@RequestBody AcceptMedicalTestsRequest request) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalTestServices.acceptMedicalTest(request))
                        .build()
        );
    }

    @GetMapping("/{medicalTestId}")
    public ResponseEntity<?> getMedicalTestRecord(
            @PathVariable UUID medicalTestId
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalTestServices.getMedicalTestRecordById(medicalTestId))
                        .build()
        );
    }

    @PutMapping("/{medicalTestId}/complete")
    public ResponseEntity<?> CompleteMedicalTest(@PathVariable UUID medicalTestId, @RequestParam MultipartFile file) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalTestServices.completeMedicalTest(medicalTestId, file))
                        .build()
        );
    }
}
