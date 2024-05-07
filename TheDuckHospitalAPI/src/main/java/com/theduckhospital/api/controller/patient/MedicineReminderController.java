package com.theduckhospital.api.controller.patient;

import com.theduckhospital.api.dto.request.MedicineReminderRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IMedicineReminderServices;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("/api/medicine-reminders")
@PreAuthorize("hasRole('ROLE_USER')")
public class MedicineReminderController {
    private final IMedicineReminderServices medicineReminderServices;

    public MedicineReminderController(IMedicineReminderServices medicineReminderServices) {
        this.medicineReminderServices = medicineReminderServices;
    }

    @PostMapping
    public ResponseEntity<?> createMedicineReminder(
            @RequestHeader("Authorization") String authorization,
            @RequestBody MedicineReminderRequest medicineReminderRequest
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Create medicine reminder successfully")
                .data(medicineReminderServices.patientCreateMedicineReminder(
                        authorization,
                        medicineReminderRequest
                ))
                .statusCode(200)
                .build()
        );
    }

    @PutMapping("/{reminderId}")
    public ResponseEntity<?> updateMedicineReminder(
            @PathVariable(name = "reminderId") UUID reminderId,
            @RequestHeader("Authorization") String authorization,
            @RequestBody MedicineReminderRequest medicineReminderRequest
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Update medicine reminder successfully")
                .data(medicineReminderServices.patientUpdateMedicineReminder(
                        authorization,
                        reminderId,
                        medicineReminderRequest
                ))
                .statusCode(200)
                .build()
        );
    }

    @GetMapping
    public ResponseEntity<?> getMedicineReminders(
            @RequestHeader("Authorization") String authorization,
            @RequestParam(name = "date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Get medicine reminders successfully")
                .data(medicineReminderServices.patientGetMedicineReminders(authorization, date))
                .build()
        );
    }

    @GetMapping("/received")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> confirmReceivedMedicineReminder(
            @RequestParam(name = "reminderId") UUID reminderId,
            @RequestParam(name = "confirmId") UUID confirmId
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Confirm received medicine reminder successfully")
                .data(medicineReminderServices.confirmReceivedMedicineReminder(reminderId, confirmId))
                .build()
        );
    }

    @GetMapping("/prescription")
    public ResponseEntity<?> searchPrescription(
            @RequestParam(name = "patientProfileId") UUID patientProfileId,
            @RequestParam(name = "startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam(name = "endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
            @RequestHeader(name = "Authorization") String authorization
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Search prescription successfully")
                .data(medicineReminderServices.searchPrescription(
                        authorization,
                        patientProfileId,
                        startDate,
                        endDate
                ))
                .build()
        );
    }

    @GetMapping("/prescription-by-code")
    public ResponseEntity<?> searchPrescriptionById(
            @RequestParam(name = "patientProfileId") UUID patientProfileId,
            @RequestParam(name = "prescriptionCode") String prescriptionCode,
            @RequestHeader(name = "Authorization") String authorization
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Search prescription successfully")
                .data(medicineReminderServices.searchPrescriptionByCode(
                        authorization,
                        patientProfileId,
                        prescriptionCode
                ))
                .build()
        );
    }

    @GetMapping("/prescription/{prescriptionId}")
    public ResponseEntity<?> getPrescription(
            @PathVariable(name = "prescriptionId") UUID prescriptionId,
            @RequestHeader(name = "Authorization") String authorization,
            @RequestParam(name = "patientProfileId") UUID patientProfileId
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Get prescription successfully")
                .data(medicineReminderServices.getReminderPrescription(
                        authorization,
                        prescriptionId,
                        patientProfileId
                ))
                .build()
        );
    }

    @DeleteMapping("/{reminderId}/{reminderDetailId}")
    public ResponseEntity<?> deleteMedicineReminder(
            @PathVariable(name = "reminderId") UUID reminderId,
            @PathVariable(name = "reminderDetailId") UUID reminderDetailId,
            @RequestParam(name = "type") String type,
            @RequestHeader(name = "Authorization") String authorization
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Mark medicine as used successfully")
                .data(medicineReminderServices.deleteMedicineReminderDetails(
                        authorization,
                        reminderId,
                        reminderDetailId,
                        type
                ))
                .build()
        );
    }

    @DeleteMapping("/{reminderId}")
    public ResponseEntity<?> deleteMedicineReminder(
            @PathVariable(name = "reminderId") UUID reminderId,
            @RequestHeader(name = "Authorization") String authorization
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Delete medicine reminder successfully")
                .data(medicineReminderServices.deleteMedicineReminder(
                        authorization,
                        reminderId
                ))
                .build()
        );
    }

    @GetMapping("/medicine-reminder-history")
    public ResponseEntity<?> getMedicineReminderHistory(
            @RequestHeader(name = "Authorization") String authorization
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Get medicine reminder history successfully")
                .data(medicineReminderServices.getMedicineReminderHistory(
                        authorization
                ))
                .build()
        );
    }
}
