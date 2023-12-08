package com.theduckhospital.api.controller;

import com.theduckhospital.api.dto.request.GeneralResponse;
import com.theduckhospital.api.services.INationServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/nations")
public class NationController {
    private final INationServices nationServices;

    public NationController(INationServices nationServices) {
        this.nationServices = nationServices;
    }

    @GetMapping
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .data(nationServices.findAll())
                        .message("Success")
                        .success(true)
                        .build()
        );
    }
}
