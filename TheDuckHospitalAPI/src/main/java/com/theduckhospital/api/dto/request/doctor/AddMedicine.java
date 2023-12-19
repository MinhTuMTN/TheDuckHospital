package com.theduckhospital.api.dto.request.doctor;

import lombok.Data;

@Data
public class AddMedicine {
    private int medicineId;
    private int quantity;
    private String note;
}
