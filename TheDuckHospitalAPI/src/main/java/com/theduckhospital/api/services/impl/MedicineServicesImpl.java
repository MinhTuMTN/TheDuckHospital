package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.dto.request.admin.CreateMedicineRequest;
import com.theduckhospital.api.dto.response.admin.FilteredMedicinesResponse;
import com.theduckhospital.api.entity.Medicine;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.MedicineRepository;
import com.theduckhospital.api.services.IMedicineServices;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        medicine.setDeleted(false);

        return medicineRepository.save(medicine);
    }

    @Override
    public Medicine updateMedicine(int medicineId, CreateMedicineRequest request) {
        Medicine medicine = findMedicineById(medicineId);
        medicine.setMedicineName(request.getMedicineName());
        medicine.setPrice(request.getPrice());
        medicine.setQuantity(request.getQuantity());

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
    public FilteredMedicinesResponse getPaginationMedicinesDeleted(int page, int limit) {
        Pageable pageable = PageRequest.of(page, limit);
        Page<Medicine> medicinePage = medicineRepository.findPaginationByOrderByMedicineNameAscDeletedAsc(pageable);

        List<Medicine> medicines = new ArrayList<>(medicinePage.getContent());

        long numberOfMedicine = medicineRepository.count();

        return new FilteredMedicinesResponse(medicines, numberOfMedicine, page, limit);
    }

//    @Override
//    public List<RoomResponse> getAllRoomsDeleted() {
//        List<RoomResponse> responses = new ArrayList<>();
//
//        for (Room room : roomRepository.findAllByOrderByDeleted()) {
//            responses.add(new RoomResponse(room));
//        }
//
//        return responses;
//    }
//
//    @Override
//    public RoomResponse getRoomById(int roomId) {
//        Optional<Room> optional = roomRepository.findById(roomId);
//        if (optional.isEmpty()) {
//            throw new NotFoundException("Room not found");
//        }
//
//        Room room = optional.get();
//
//        return new RoomResponse(room);
//    }

    @Override
    public Medicine findMedicineById(int medicineId) {
        return medicineRepository.findById(medicineId).orElseThrow(() -> new NotFoundException("Medicine not found"));
    }
}
