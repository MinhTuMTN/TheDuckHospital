package com.theduckhospital.api.controller.doctor;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IMedicineServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/doctor/medicines")
@PreAuthorize("hasAnyRole('ROLE_DOCTOR', 'ROLE_HEAD_DOCTOR')")
public class MedicineController {
    private final IMedicineServices medicineServices;

    public MedicineController(IMedicineServices medicineServices) {
        this.medicineServices = medicineServices;
    }

    @GetMapping
    public ResponseEntity<?> getMedicines(
            @RequestParam(name = "q", defaultValue = "") String query,
            @RequestParam(name = "limit", defaultValue = "10") int limit
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicineServices.getMedicines(query, limit))
                        .build()
        );
    }
}
