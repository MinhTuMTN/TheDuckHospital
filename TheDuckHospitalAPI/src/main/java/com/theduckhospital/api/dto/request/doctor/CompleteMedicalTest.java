package com.theduckhospital.api.dto.request.doctor;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CompleteMedicalTest {
    private MultipartFile file;
    private String testResult;
}
