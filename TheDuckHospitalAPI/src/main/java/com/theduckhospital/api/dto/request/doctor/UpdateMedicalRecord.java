package com.theduckhospital.api.dto.request.doctor;

import lombok.Data;

import java.util.Date;

@Data
public class UpdateMedicalRecord {
    private String symptom;
    private String diagnosis;
    private Date dateOfReExamination;
}
