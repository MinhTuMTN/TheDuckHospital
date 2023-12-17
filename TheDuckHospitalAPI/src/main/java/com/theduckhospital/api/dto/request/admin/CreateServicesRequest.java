package com.theduckhospital.api.dto.request.admin;

import com.theduckhospital.api.constant.ServiceType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateServicesRequest {
    private String serviceName;
    @Min(value = 0, message = "Price must be greater than 0")
    private double price;
    @NotNull(message = "Service type must not be null")
    private ServiceType serviceType;
    private Integer departmentId;
}
