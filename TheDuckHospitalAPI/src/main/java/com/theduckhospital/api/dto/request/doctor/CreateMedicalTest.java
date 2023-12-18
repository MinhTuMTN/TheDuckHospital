package com.theduckhospital.api.dto.request.doctor;

import lombok.Data;

@Data
public class CreateMedicalTest {
    private int serviceId;
    private String note;
}
