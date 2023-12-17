package com.theduckhospital.api.controller;

import com.theduckhospital.api.services.ICloudinaryServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class HelloController {
    @Autowired
    private ICloudinaryServices cloudinaryServices;

    //Post mapping to upload PDF file
    @PostMapping("/upload")
    public String uploadFile(
             @RequestParam("file") MultipartFile file
    ) {
        return cloudinaryServices.uploadFile(file);
    }

}
