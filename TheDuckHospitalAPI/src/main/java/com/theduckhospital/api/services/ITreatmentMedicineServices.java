package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.nurse.CreateTreatmentMedicineRequest;
import com.theduckhospital.api.entity.HospitalAdmission;
import com.theduckhospital.api.entity.HospitalizationDetail;
import com.theduckhospital.api.entity.TreatmentMedicine;

import java.util.List;
import java.util.UUID;

public interface ITreatmentMedicineServices {
    List<TreatmentMedicine> getTreatmentMedicinesByHospitalizationDetail(
            HospitalizationDetail hospitalizationDetail
    );
    List<TreatmentMedicine> createTreatmentMedicinesByHospitalizationDetail(
            HospitalizationDetail hospitalizationDetail,
            CreateTreatmentMedicineRequest request
    );
    List<TreatmentMedicine> getTreatmentMedicinesByYesterdayHospitalizationDetail(
            HospitalizationDetail yesterdayHospitalizationDetail,
            HospitalizationDetail hospitalizationDetail
    );
    List<TreatmentMedicine> deleteTreatmentMedicine(
            HospitalAdmission hospitalAdmission,
            UUID treatmentMedicineId,
            boolean deleteFromTomorrow
    );
}
