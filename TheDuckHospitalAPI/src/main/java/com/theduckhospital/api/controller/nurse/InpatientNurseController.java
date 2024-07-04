package com.theduckhospital.api.controller.nurse;

import com.theduckhospital.api.dto.request.doctor.CreateMedicalTest;
import com.theduckhospital.api.dto.request.nurse.CreateTreatmentMedicineRequest;
import com.theduckhospital.api.dto.request.nurse.UpdateDailyHospitalAdmissionDetails;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.entity.HospitalizationDetail;
import com.theduckhospital.api.services.IInpatientServices;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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
            @RequestParam(value = "patientName", defaultValue = "") String patientName,
            @PathVariable("roomId") int roomId
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Get patients by room successfully")
                .data(inpatientServices.getPatientsByRoom(roomId, patientName))
                .build()
        );
    }

    @PostMapping("/hospitalization/{hospitalizationId}/medical-tests")
    public ResponseEntity<?> createInpatientMedicalTest(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("hospitalizationId") UUID hospitalizationId,
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
            @RequestParam(value = "serviceId", defaultValue = "0") int serviceId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "5") int size
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Get inpatient medical tests successfully")
                .data(inpatientServices
                        .getInpatientMedicalTests(
                                authorization,
                                hospitalizationId,
                                serviceId,
                                page,
                                size
                        )
                )
                .build()
        );
    }

    @DeleteMapping("/hospitalization/{hospitalizationId}/medical-tests/{medicalTestId}")
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
        HospitalizationDetail hospitalizationDetail = inpatientServices
                .updateDailyHospitalAdmissionDetails(
                        authorization,
                        hospitalizationId,
                        updateDailyHospitalAdmissionDetails
                );
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Update daily hospital admission details successfully")
                .data(inpatientServices.convertHospitalizationDetailDTO(hospitalizationDetail))
                .build()
        );
    }

    @GetMapping("/hospitalization/{hospitalizationId}/details")
    public ResponseEntity<?> getDailyHospitalAdmissionDetails(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("hospitalizationId") UUID hospitalizationId,
            @RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date
    ) {
        HospitalizationDetail hospitalizationDetail = inpatientServices
                .getDailyHospitalAdmissionDetails(
                        authorization,
                        hospitalizationId,
                        date
                );
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Get daily hospital admission details successfully")
                .data(inpatientServices.convertHospitalizationDetailDTO(hospitalizationDetail))
                .build()
        );
    }

    @GetMapping("/hospitalization/{hospitalizationId}/medical-tests-by-date")
    public ResponseEntity<?> getInpatientMedicalTestsByDate(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("hospitalizationId") UUID hospitalizationId,
            @RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Get inpatient medical tests by date successfully")
                .data(inpatientServices
                        .getInpatientMedicalTestsByDate(
                                authorization,
                                hospitalizationId,
                                date
                        )
                )
                .build()
        );
    }

    @GetMapping("/hospitalization/{hospitalizationId}/medicines")
    public ResponseEntity<?> getMedicinesOfHospitalAdmission(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("hospitalizationId") UUID hospitalizationId,
            @RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Get medicines of hospital admission successfully")
                .data(inpatientServices
                        .getMedicinesOfHospitalAdmission(
                                authorization,
                                hospitalizationId,
                                date
                        )
                )
                .build()
        );
    }

    @PostMapping("/hospitalization/{hospitalizationId}/medicines")
    public ResponseEntity<?> createTreatmentMedicine(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("hospitalizationId") UUID hospitalizationId,
            @RequestBody CreateTreatmentMedicineRequest createTreatmentMedicineRequest
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Create treatment medicine successfully")
                .data(inpatientServices
                        .createTreatmentMedicine(
                                authorization,
                                hospitalizationId,
                                createTreatmentMedicineRequest
                        )
                )
                .build()
        );
    }

    @DeleteMapping("/hospitalization/{hospitalizationId}/medicines/{treatmentMedicineId}")
    public ResponseEntity<?> deleteTreatmentMedicine(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("hospitalizationId") UUID hospitalizationId,
            @PathVariable("treatmentMedicineId") UUID treatmentMedicineId,
            @RequestParam(value = "tomorrow", defaultValue = "false") boolean deleteFromTomorrow
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Create treatment medicine successfully")
                .data(inpatientServices
                        .deleteTreatmentMedicine(
                                authorization,
                                hospitalizationId,
                                treatmentMedicineId,
                                deleteFromTomorrow
                        )
                )
                .build()
        );
    }

    @GetMapping("/hospitalization/{hospitalizationId}/general-info")
    public ResponseEntity<?> getGeneralInfoOfHospitalAdmission(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("hospitalizationId") UUID hospitalizationId
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Update daily hospital admission details successfully")
                .data(inpatientServices
                        .getGeneralInfoOfHospitalAdmission(
                                authorization,
                                hospitalizationId
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
