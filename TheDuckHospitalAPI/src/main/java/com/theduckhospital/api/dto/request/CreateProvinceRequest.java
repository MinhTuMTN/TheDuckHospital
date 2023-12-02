package com.theduckhospital.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateProvinceRequest {
    @NotBlank(message = "Province name is required")
    private String provinceName;
}
