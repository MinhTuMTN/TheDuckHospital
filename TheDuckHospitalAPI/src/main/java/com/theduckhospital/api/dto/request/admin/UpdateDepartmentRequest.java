package com.theduckhospital.api.dto.request.admin;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.UUID;

@Data
public class UpdateDepartmentRequest {
    @NotBlank(message = "Department name is required")
    private String departmentName;
    private String description;
    private UUID staffId;
    private UUID headNurseId;
}
