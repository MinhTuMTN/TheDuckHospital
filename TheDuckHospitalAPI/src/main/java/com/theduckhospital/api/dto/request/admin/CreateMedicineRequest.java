package com.theduckhospital.api.dto.request.admin;

import com.theduckhospital.api.constant.MedicineUnit;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateMedicineRequest {
    @NotBlank(message = "Medicine name is required")
    @NotNull(message = "Medicine name is required")
    private String medicineName;
    @NotNull(message = "Medicine price is required")
    private Double price;
    @NotNull(message = "Medicine quantity is required")
    private Integer quantity;
    @NotNull(message = "Unit is required")
    private MedicineUnit unit;
}
