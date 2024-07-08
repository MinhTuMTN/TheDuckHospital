package com.theduckhospital.api.services;

import com.theduckhospital.api.entity.Discharge;
import com.theduckhospital.api.entity.HospitalAdmission;
import com.theduckhospital.api.entity.MedicalExaminationRecord;
import com.theduckhospital.api.entity.Prescription;

public interface IPrescriptionServices {
    Prescription getPrescription(Discharge discharge);
    Prescription getPrescription(MedicalExaminationRecord medicalExaminationRecord);
    void savePrescription(Prescription prescription);
}
