package com.theduckhospital.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateWardRequest {
    @NotBlank(message = "Ward name is required")
    private String wardName;
}
