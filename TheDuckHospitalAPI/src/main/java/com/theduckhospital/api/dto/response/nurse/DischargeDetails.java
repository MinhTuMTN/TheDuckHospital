package com.theduckhospital.api.dto.response.nurse;

import com.theduckhospital.api.entity.Discharge;
import lombok.Data;

import java.util.Date;

@Data
public class DischargeDetails {
    private String dischargeSummary;
    private String treatments;
    private String note;
    private Date dischargeDate;
    private Date reExaminationDate;

    public DischargeDetails(Discharge discharge) {
        this.dischargeSummary = discharge.getDischargeSummary();
        this.treatments = discharge.getTreatments();
        this.note = discharge.getNote();
        this.dischargeDate = discharge.getDischargeDate();
        this.reExaminationDate = discharge.getReExaminationDate();
    }
}
