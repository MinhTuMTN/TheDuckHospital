package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.LaboratoryTechnician;
import com.theduckhospital.api.entity.MedicalService;
import com.theduckhospital.api.entity.MedicalTest;
import lombok.Data;

@Data
public class MedicalTestResultResponse {
    private Doctor doctor;
    private LaboratoryTechnician laboratoryTechnician;
    private MedicalService medicalService;
    private MedicalTest medicalTest;

    public MedicalTestResultResponse(
            Doctor doctor,
            LaboratoryTechnician laboratoryTechnician,
            MedicalService medicalService,
            MedicalTest medicalTest
    ) {
        this.doctor = doctor;
        this.laboratoryTechnician = laboratoryTechnician;
        this.medicalService = medicalService;
        this.medicalTest = medicalTest;
    }
}
