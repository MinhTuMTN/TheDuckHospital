package com.theduckhospital.api.controller;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IDoctorServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/home")
public class HomeController {
    private final IDoctorServices doctorServices;

    public HomeController(IDoctorServices doctorServices) {
        this.doctorServices = doctorServices;
    }


    @GetMapping("/all-head-doctors")
    public ResponseEntity<?> getAllHeadDoctors() {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get all head doctors successfully")
                        .data(doctorServices.getAllHeadDoctors())
                        .build()
        );
    }
}
