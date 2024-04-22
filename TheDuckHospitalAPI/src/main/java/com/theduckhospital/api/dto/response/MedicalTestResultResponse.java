package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.LaboratoryTechnician;
import com.theduckhospital.api.entity.MedicalService;
import lombok.Data;

@Data
public class MedicalTestResultResponse {
    private Doctor doctor;
    private LaboratoryTechnician laboratoryTechnician;
    private MedicalService medicalService;

    public MedicalTestResultResponse(
            Doctor doctor,
            LaboratoryTechnician laboratoryTechnician,
            MedicalService medicalService
    ) {
        this.doctor = doctor;
        this.laboratoryTechnician = laboratoryTechnician;
        this.medicalService = medicalService;
    }
}
