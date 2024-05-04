package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.entity.DoctorSchedule;
import com.theduckhospital.api.entity.Prescription;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class PrescriptionResponse {
    private UUID prescriptionId;
    private String departmentName;
    private Date examinationDate;

    public PrescriptionResponse(Prescription prescription) {
        DoctorSchedule doctorSchedule = prescription.getMedicalExaminationRecord().getDoctorSchedule();
        this.prescriptionId = prescription.getPrescriptionId();
        this.departmentName = doctorSchedule.getDoctor().getDepartment().getDepartmentName();
        this.examinationDate = prescription.getCreatedAt();
    }
}
