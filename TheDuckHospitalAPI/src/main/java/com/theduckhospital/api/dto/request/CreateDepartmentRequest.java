package com.theduckhospital.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateDepartmentRequest {
    @NotBlank(message = "Department name is required")
    private String departmentName;
    private String departmentDescription;
}
