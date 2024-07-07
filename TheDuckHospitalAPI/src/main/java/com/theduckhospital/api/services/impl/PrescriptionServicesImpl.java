package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.entity.Discharge;
import com.theduckhospital.api.entity.HospitalAdmission;
import com.theduckhospital.api.entity.MedicalExaminationRecord;
import com.theduckhospital.api.entity.Prescription;
import com.theduckhospital.api.repository.PrescriptionRepository;
import com.theduckhospital.api.services.IPrescriptionServices;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class PrescriptionServicesImpl implements IPrescriptionServices {
    private final PrescriptionRepository prescriptionRepository;

    public PrescriptionServicesImpl(PrescriptionRepository prescriptionRepository) {
        this.prescriptionRepository = prescriptionRepository;
    }

    @Override
    public Prescription getPrescription(Discharge discharge) {
        Prescription prescription = discharge.getPrescription();
        if (prescription == null) {
            prescription = createPrescription(
                    discharge,
                    null
            );
        }

        return prescription;
    }

    @Override
    public Prescription getPrescription(MedicalExaminationRecord medicalExaminationRecord) {
        Prescription prescription = medicalExaminationRecord.getPrescription();
        if (prescription == null) {
            prescription = createPrescription(
                    null,
                    medicalExaminationRecord
            );
        }

        return prescription;
    }

    @Override
    public void savePrescription(Prescription prescription) {
        prescriptionRepository.save(prescription);
    }

    private Prescription createPrescription(Discharge discharge, MedicalExaminationRecord medicalExaminationRecord) {
        Prescription prescription = new Prescription();
        prescription.setDischarge(discharge);
        prescription.setMedicalExaminationRecord(medicalExaminationRecord);
        prescription.setPharmacist(null);
        prescription.setPrescriptionItems(new ArrayList<>());
        prescription.setTotalCost(0);

        prescriptionRepository.save(prescription);

        return prescription;
    }
}
