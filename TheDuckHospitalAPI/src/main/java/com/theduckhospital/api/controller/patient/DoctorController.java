package com.theduckhospital.api.controller.patient;

import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IDoctorServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {
    private final IDoctorServices doctorServices;

    public DoctorController(IDoctorServices doctorServices) {
        this.doctorServices = doctorServices;
    }

    @GetMapping("/head-doctors")
    public ResponseEntity<?> getAllHeadDoctors() {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get all head doctors successfully")
                        .data(doctorServices.getAllHeadDoctors())
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<?> getMedicalExaminationDoctors(
            @RequestParam(name = "fullName", required = false, defaultValue = "") String fullName,
            @RequestParam(name = "departmentId", required = false) Integer departmentId,
            @RequestParam(name = "degree", required = false) Degree degree,
            @RequestParam(name = "page", required = false, defaultValue = "1") int page,
            @RequestParam(name = "limit", required = false, defaultValue = "10") int limit
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get all doctors successfully")
                        .data(doctorServices
                                .getMedicalExaminationDoctors(
                                        fullName,
                                        departmentId,
                                        degree,
                                        page,
                                        limit)
                        )
                        .build()
        );
    }
}
