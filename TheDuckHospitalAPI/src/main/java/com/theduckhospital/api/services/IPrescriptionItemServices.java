package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.doctor.AddMedicine;
import com.theduckhospital.api.entity.Prescription;
import com.theduckhospital.api.entity.PrescriptionItem;

import java.util.List;
import java.util.UUID;

public interface IPrescriptionItemServices {
    List<PrescriptionItem> addMedicineToPrescription(
            Prescription prescription,
            AddMedicine request
    );
    List<PrescriptionItem> getMedicinesByPrescription(Prescription prescription);
    List<PrescriptionItem> deleteMedicineFromPrescription(
            Prescription prescription,
            UUID prescriptionItemId
    );
}
