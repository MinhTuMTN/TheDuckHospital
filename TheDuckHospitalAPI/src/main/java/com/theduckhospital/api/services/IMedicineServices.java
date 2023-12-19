package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.admin.CreateMedicineRequest;
import com.theduckhospital.api.dto.response.admin.FilteredMedicinesResponse;
import com.theduckhospital.api.entity.Medicine;

import java.util.List;

public interface IMedicineServices {
    Medicine createMedicine(CreateMedicineRequest request);

    Medicine updateMedicine(int medicineId, CreateMedicineRequest request);

    boolean deleteMedicine(int medicineId);

    Medicine restoreMedicine(int medicineId);

    FilteredMedicinesResponse getPaginationFilteredMedicines(
            String search,
            int page,
            int limit
    );

    Medicine findMedicineById(int medicineId);

    List<Medicine> getMedicines(String query, int limit);
}
