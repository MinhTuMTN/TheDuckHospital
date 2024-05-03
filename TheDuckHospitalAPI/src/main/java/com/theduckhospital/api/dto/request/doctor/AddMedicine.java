package com.theduckhospital.api.dto.request.doctor;

import lombok.Data;

@Data
public class AddMedicine {
    private int medicineId;
    private int quantity;
    private int timesPerDay;
    private int days;
    private float quantityPerTime;
    private boolean morning;
    private boolean noon;
    private boolean afternoon;
    private boolean evening;
    private String note;
}
