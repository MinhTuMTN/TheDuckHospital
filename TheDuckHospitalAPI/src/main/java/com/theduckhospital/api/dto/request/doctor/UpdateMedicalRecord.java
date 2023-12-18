package com.theduckhospital.api.dto.request.doctor;

import lombok.Data;

@Data
public class UpdateMedicalRecord {
    private String symptom;
    private String diagnosis;
}
