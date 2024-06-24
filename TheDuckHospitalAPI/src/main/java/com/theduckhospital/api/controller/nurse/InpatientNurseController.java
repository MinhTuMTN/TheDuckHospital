package com.theduckhospital.api.controller.nurse;

import com.theduckhospital.api.dto.request.doctor.CreateMedicalTest;
import com.theduckhospital.api.dto.request.nurse.UpdateDailyHospitalAdmissionDetails;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IInpatientServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/inpatient-nurse")
@PreAuthorize("hasRole('NURSE') || hasRole('HEAD_NURSE')")
public class InpatientNurseController {
    private final IInpatientServices inpatientServices;

    public InpatientNurseController(IInpatientServices inpatientServices) {
        this.inpatientServices = inpatientServices;
    }

    @GetMapping("/treatment-room")
    public ResponseEntity<?> getTreatmentRoomBySchedule(
            @RequestHeader("Authorization") String authorization
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Get treatment room by schedule successfully")
                .data(inpatientServices.getTreatmentRoomBySchedule(authorization))
                .build()
        );
    }

    @GetMapping("/treatment-room/{roomId}/patients")
    public ResponseEntity<?> getPatientsByRoom(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("roomId") int roomId
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Get patients by room successfully")
                .data(inpatientServices.getPatientsByRoom(roomId))
                .build()
        );
    }

    @PostMapping("/hospitalization/{hospitalizationId}/medical-test")
    public ResponseEntity<?> createInpatientMedicalTest(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("hospitalizationId")UUID hospitalizationId,
            @RequestBody CreateMedicalTest createMedicalTest
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Create inpatient medical test successfully")
                .data(inpatientServices
                        .createInpatientMedicalTest(
                                authorization,
                                hospitalizationId,
                                createMedicalTest
                        )
                )
                .build()
        );
    }

    @GetMapping("/hospitalization/{hospitalizationId}/medical-tests")
    public ResponseEntity<?> getInpatientMedicalTests(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("hospitalizationId") UUID hospitalizationId,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Get inpatient medical tests successfully")
                .data(inpatientServices
                        .getInpatientMedicalTests(
                                authorization,
                                hospitalizationId,
                                page,
                                size
                        )
                )
                .build()
        );
    }

    @DeleteMapping("/hospitalization/{hospitalizationId}/medical-test/{medicalTestId}")
    public ResponseEntity<?> deleteInpatientMedicalTest(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("hospitalizationId") UUID hospitalizationId,
            @PathVariable("medicalTestId") UUID medicalTestId
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Delete inpatient medical test successfully")
                .data(inpatientServices
                        .deleteInpatientMedicalTest(
                                authorization,
                                hospitalizationId,
                                medicalTestId
                        )
                )
                .build()
        );
    }

    @PostMapping("/hospitalization/{hospitalizationId}/details")
    public ResponseEntity<?> updateDailyHospitalAdmissionDetails(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("hospitalizationId") UUID hospitalizationId,
            @RequestBody UpdateDailyHospitalAdmissionDetails updateDailyHospitalAdmissionDetails
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Update daily hospital admission details successfully")
                .data(inpatientServices
                        .updateDailyHospitalAdmissionDetails(
                                authorization,
                                hospitalizationId,
                                updateDailyHospitalAdmissionDetails
                        )
                )
                .build()
        );
    }

    @GetMapping("/medical-test-services")
    public ResponseEntity<?> getAllMedicalTestServices() {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Get all medical test services successfully")
                .data(inpatientServices.getAllMedicalTestServices())
                .build()
        );
    }

    @GetMapping("/doctors")
    public ResponseEntity<?> getAllDoctorInDepartment(
            @RequestHeader("Authorization") String authorization
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Get all doctor in department successfully")
                .data(inpatientServices.getDoctorsInDepartment(authorization))
                .build()
        );
    }
}
