package com.theduckhospital.api.dto.request.nurse;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class UpdateDischargeDetails {
    private String dischargeSummary;
    private String treatments;
    private String note;
    private Date reExaminationDate;
    private UUID doctorId;
}
