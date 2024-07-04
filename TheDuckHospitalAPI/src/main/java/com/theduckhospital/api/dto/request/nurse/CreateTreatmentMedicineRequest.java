package com.theduckhospital.api.dto.request.nurse;

import lombok.Data;

@Data
public class CreateTreatmentMedicineRequest {
    private int medicineId;
    private String note;
    private int quantity;
    private boolean morning;
    private boolean afternoon;
    private boolean evening;
    private boolean night;
}
