package com.theduckhospital.api.services;

import com.theduckhospital.api.entity.HospitalizationDetail;
import com.theduckhospital.api.entity.TreatmentMedicine;

import java.util.List;

public interface ITreatmentMedicineServices {
    List<TreatmentMedicine> getTreatmentMedicinesByHospitalizationDetail(
            HospitalizationDetail hospitalizationDetail
    );
}
