package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.dto.request.admin.CreateMedicineRequest;
import com.theduckhospital.api.dto.response.admin.FilteredMedicinesResponse;
import com.theduckhospital.api.entity.Medicine;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.MedicineRepository;
import com.theduckhospital.api.services.IMedicineServices;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineServicesImpl implements IMedicineServices {
    private final MedicineRepository medicineRepository;

    public MedicineServicesImpl(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    @Override
    public Medicine createMedicine(CreateMedicineRequest request) {
        Medicine medicine = new Medicine();
        medicine.setMedicineName(request.getMedicineName());
        medicine.setPrice(request.getPrice());
        medicine.setQuantity(request.getQuantity());
        medicine.setUnit(request.getUnit());
        medicine.setDeleted(false);

        return medicineRepository.save(medicine);
    }

    @Override
    public Medicine updateMedicine(int medicineId, CreateMedicineRequest request) {
        Medicine medicine = findMedicineById(medicineId);
        medicine.setMedicineName(request.getMedicineName());
        medicine.setPrice(request.getPrice());
        medicine.setQuantity(request.getQuantity());
        medicine.setUnit(request.getUnit());

        return medicineRepository.save(medicine);
    }

    @Override
    public boolean deleteMedicine(int medicineId) {
        Medicine medicine = findMedicineById(medicineId);
        medicine.setDeleted(true);

        medicineRepository.save(medicine);

        return true;
    }

    @Override
    public Medicine restoreMedicine(int medicineId) {
        Medicine medicine = findMedicineById(medicineId);
        medicine.setDeleted(false);

        return medicineRepository.save(medicine);
    }

    @Override
    public FilteredMedicinesResponse getPaginationFilteredMedicines(
            String search,
            int page,
            int limit
    ) {
        List<Medicine> medicines = medicineRepository.findByMedicineNameContaining(search);

        Pageable pageable = PageRequest.of(page, limit);

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), medicines.size());
        List<Medicine> response = medicines.subList(start, end);

        return new FilteredMedicinesResponse(response, medicines.size(), page, limit);
    }

    @Override
    public Medicine findMedicineById(int medicineId) {
        return medicineRepository.findById(medicineId).orElseThrow(() -> new NotFoundException("Medicine not found"));
    }

    @Override
    public List<Medicine> getMedicines(String query, int limit) {
        Pageable pageable = PageRequest.of(0, limit);

        return medicineRepository
                .findByMedicineNameContainingIgnoreCaseAndDeletedIsFalse(
                        query,
                        pageable
                )
                .getContent();
    }
}
