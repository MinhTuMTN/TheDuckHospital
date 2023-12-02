package com.theduckhospital.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateDistrictRequest {
    @NotBlank(message = "District name is required")
    private String districtName;
}
