package com.theduckhospital.api.dto.request;

import com.theduckhospital.api.constant.ServiceType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateServicesRequest {
    private String serviceName;

    @Min(value = 0, message = "Price must be greater than 0")
    private double price;
    private ServiceType serviceType;
    @NotNull(message = "Department ID must not be null")
    private Integer departmentId;
}
