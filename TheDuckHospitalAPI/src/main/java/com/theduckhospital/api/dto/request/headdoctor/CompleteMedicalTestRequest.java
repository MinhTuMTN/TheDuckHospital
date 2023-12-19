package com.theduckhospital.api.dto.request.headdoctor;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CompleteMedicalTestRequest {
    @NotNull(message = "File is required")
    MultipartFile file;
}
