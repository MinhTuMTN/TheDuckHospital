package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.dto.request.admin.CreateMedicineRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IMedicineServices;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/medicines")
//@PreAuthorize("hasRole('ROLE_ADMIN')")
public class MedicineAdminController {
    private final IMedicineServices medicineServices;

    public MedicineAdminController(IMedicineServices medicineServices) {
        this.medicineServices = medicineServices;
    }

    @PostMapping
    public ResponseEntity<?> createMedicine(@RequestBody @Valid CreateMedicineRequest request) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Create medicine successfully")
                        .data(medicineServices.createMedicine(request))
                        .build()
        );
    }


    @GetMapping("/filtered")
    public ResponseEntity<?> getPaginationMedicine(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int limit
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get filtered pagination medicines successfully")
                        .data(medicineServices.getPaginationFilteredMedicines(search, page, limit))
                        .build()
        );
    }

    @PutMapping("/{medicineId}")
    public ResponseEntity<?> updateMedicine(
            @PathVariable int medicineId,
            @RequestBody CreateMedicineRequest request) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Update medicine successfully")
                        .data(medicineServices.updateMedicine(medicineId, request))
                        .build()
        );
    }

    @DeleteMapping("/{medicineId}")
    public ResponseEntity<?> deleteMedicine(@PathVariable int medicineId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Delete medicine successfully")
                        .data(medicineServices.deleteMedicine(medicineId))
                        .build()
        );
    }

    @PutMapping("/{medicineId}/restore")
    public ResponseEntity<?> restoreMedicine(@PathVariable int medicineId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Restore medicine successfully")
                        .data(medicineServices.restoreMedicine(medicineId))
                        .build()
        );
    }
}
