package com.theduckhospital.api.dto.response.nurse;

import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.entity.Discharge;
import com.theduckhospital.api.entity.Doctor;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class DischargeDetails {
    private String dischargeSummary;
    private String treatments;
    private String note;
    private Date dischargeDate;
    private Date reExaminationDate;
    private UUID doctorId;
    private String doctorName;
    private Degree doctorDegree;

    public DischargeDetails(Discharge discharge) {
        this.dischargeSummary = discharge.getDischargeSummary();
        this.treatments = discharge.getTreatments();
        this.note = discharge.getNote();
        this.dischargeDate = discharge.getDischargeDate();
        this.reExaminationDate = discharge.getReExaminationDate();

        Doctor doctor = discharge.getDoctor();
        if (doctor != null) {
            this.doctorId = doctor.getStaffId();
            this.doctorName = doctor.getFullName();
            this.doctorDegree = doctor.getDegree();
        }
    }
}
