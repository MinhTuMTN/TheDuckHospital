package com.theduckhospital.api.dto.request.nurse;

import lombok.Data;

import java.util.Date;

@Data
public class CreateTreatmentMedicineRequest {
    private int medicineId;
    private String note;
    private int quantityPerTime;
    private boolean morning;
    private boolean afternoon;
    private boolean evening;
    private boolean night;
    private Date date;
}
