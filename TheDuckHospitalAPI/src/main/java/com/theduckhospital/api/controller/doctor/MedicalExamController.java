package com.theduckhospital.api.controller.doctor;

import com.theduckhospital.api.dto.request.doctor.AddMedicine;
import com.theduckhospital.api.dto.request.doctor.CreateMedicalTest;
import com.theduckhospital.api.dto.request.doctor.UpdateMedicalRecord;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IMedicalExamServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.UUID;

@RestController
@RequestMapping("/api/doctor/medical-records")
@PreAuthorize("hasAnyRole('ROLE_DOCTOR', 'ROLE_HEAD_DOCTOR')")
public class MedicalExamController {
    private final IMedicalExamServices medicalExamServices;

    public MedicalExamController(IMedicalExamServices medicalExamServices) {
        this.medicalExamServices = medicalExamServices;
    }

    @PutMapping("/{medicalExaminationId}/accept")
    public ResponseEntity<?> acceptMedicalExamination(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("medicalExaminationId") UUID medicalExaminationId
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalExamServices.acceptMedicalExamination(authorization, medicalExaminationId))
                        .build()
        );
    }

    @GetMapping("/{medicalExaminationId}")
    public ResponseEntity<?> getMedicalExamination(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("medicalExaminationId") UUID medicalExaminationId
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalExamServices.doctorGetMedicalExamination(authorization, medicalExaminationId))
                        .build()
        );
    }

    @PutMapping("/{medicalExaminationId}")
    public ResponseEntity<?> updateMedicalExamination(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("medicalExaminationId") UUID medicalExaminationId,
            @RequestBody UpdateMedicalRecord request
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalExamServices
                                .doctorUpdateMedicalRecord(
                                        authorization,
                                        medicalExaminationId,
                                        request
                                )
                        )
                        .build()
        );
    }

    @PostMapping("/{medicalExaminationId}/medical-test")
    public ResponseEntity<?> createMedicalTest(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("medicalExaminationId") UUID medicalExaminationId,
            @RequestBody CreateMedicalTest request
    ) throws ParseException {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalExamServices.doctorCreateMedicalTest(authorization, medicalExaminationId, request))
                        .build()
        );
    }

    @GetMapping("/{medicalExaminationId}/medical-test")
    public ResponseEntity<?> getMedicalTests(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("medicalExaminationId") UUID medicalExaminationId
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalExamServices.doctorGetMedicalTests(authorization, medicalExaminationId))
                        .build()
        );
    }

    @DeleteMapping ("/{medicalExaminationId}/medical-test/{medicalTestId}")
    public ResponseEntity<?> getMedicalTests(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("medicalExaminationId") UUID medicalExaminationId,
            @PathVariable("medicalTestId") UUID medicalTestId
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalExamServices
                                .doctorDeleteMedicalTest(
                                        authorization,
                                        medicalExaminationId,
                                        medicalTestId
                                )
                        )
                        .build()
        );
    }

    @PostMapping("/{medicalExaminationId}/medicines")
    public ResponseEntity<?> addMedicine(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("medicalExaminationId") UUID medicalExaminationId,
            @RequestBody AddMedicine request
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalExamServices.doctorAddMedicine(authorization, medicalExaminationId, request))
                        .build()
        );
    }

    @GetMapping("/{medicalExaminationId}/medicines")
    public ResponseEntity<?> getMedicines(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("medicalExaminationId") UUID medicalExaminationId
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalExamServices.doctorGetMedicines(authorization, medicalExaminationId))
                        .build()
        );
    }

    @DeleteMapping("/{medicalExaminationId}/medicines/{prescriptionItemId}")
    public ResponseEntity<?> deleteMedicine(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("medicalExaminationId") UUID medicalExaminationId,
            @PathVariable("prescriptionItemId") UUID prescriptionItemId
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalExamServices
                                .doctorDeleteMedicine(
                                        authorization,
                                        medicalExaminationId,
                                        prescriptionItemId
                                )
                        )
                        .build()
        );
    }
}
