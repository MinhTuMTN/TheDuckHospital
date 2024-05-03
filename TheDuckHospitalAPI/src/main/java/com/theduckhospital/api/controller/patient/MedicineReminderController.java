package com.theduckhospital.api.controller.patient;

import com.theduckhospital.api.dto.request.MedicineReminderRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IMedicineReminderServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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
                .build()
        );
    }

    @GetMapping
    public ResponseEntity<?> getMedicineReminders(
            @RequestHeader("Authorization") String authorization
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Get medicine reminders successfully")
                .data(medicineReminderServices.patientGetMedicineReminders(authorization))
                .build()
        );
    }

    @GetMapping("/received")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> confirmReceivedMedicineReminder(
            @RequestParam(name = "reminderId") UUID reminderId,
            @RequestParam(name = "confirmId")UUID confirmId
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Confirm received medicine reminder successfully")
                .data(medicineReminderServices.confirmReceivedMedicineReminder(reminderId, confirmId))
                .build()
        );
    }

}
