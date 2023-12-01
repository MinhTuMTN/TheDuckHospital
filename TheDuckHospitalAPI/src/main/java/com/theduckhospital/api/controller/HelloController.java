package com.theduckhospital.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.theduckhospital.api.services.ICloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class HelloController {
    private final ICloudinaryService cloudinaryService;

    public HelloController(ICloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    @GetMapping
    public String helloWorld() {
        return "Hello";
    }

    @PostMapping("/test-upload")
    public String testUploadFile(@RequestParam("file") MultipartFile file) {
        return cloudinaryService.uploadFile(file);
    }
}
