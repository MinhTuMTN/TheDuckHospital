package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.entity.HospitalizationDetail;
import com.theduckhospital.api.entity.TreatmentMedicine;
import com.theduckhospital.api.repository.TreatmentMedicineRepository;
import com.theduckhospital.api.services.ITreatmentMedicineServices;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TreatmentMedicineServicesImpl implements ITreatmentMedicineServices {
    private final TreatmentMedicineRepository treatmentMedicineRepository;

    public TreatmentMedicineServicesImpl(
            TreatmentMedicineRepository treatmentMedicineRepository
    ) {
        this.treatmentMedicineRepository = treatmentMedicineRepository;
    }

    @Override
    public List<TreatmentMedicine> getTreatmentMedicinesByHospitalizationDetail(
            HospitalizationDetail hospitalizationDetail
    ) {
        return treatmentMedicineRepository
                .findByHospitalizationDetailAndDeletedIsFalse(
                        hospitalizationDetail
                );
    }
}
