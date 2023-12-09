package com.theduckhospital.api.dto.request.admin;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateWardRequest {
    @NotBlank(message = "Ward name is required")
    private String wardName;
}
