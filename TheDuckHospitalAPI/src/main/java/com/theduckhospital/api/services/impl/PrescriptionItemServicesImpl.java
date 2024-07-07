package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.dto.request.doctor.AddMedicine;
import com.theduckhospital.api.entity.Medicine;
import com.theduckhospital.api.entity.Prescription;
import com.theduckhospital.api.entity.PrescriptionItem;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.MedicineRepository;
import com.theduckhospital.api.repository.PrescriptionItemRepository;
import com.theduckhospital.api.services.IPrescriptionItemServices;
import com.theduckhospital.api.services.IPrescriptionServices;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PrescriptionItemServicesImpl implements IPrescriptionItemServices {
    private final IPrescriptionServices prescriptionServices;
    private final PrescriptionItemRepository prescriptionItemRepository;
    private final MedicineRepository medicineRepository;

    public PrescriptionItemServicesImpl(
            IPrescriptionServices prescriptionServices,
            PrescriptionItemRepository prescriptionItemRepository,
            MedicineRepository medicineRepository
    ) {
        this.prescriptionServices = prescriptionServices;
        this.prescriptionItemRepository = prescriptionItemRepository;
        this.medicineRepository = medicineRepository;
    }

    @Override
    public List<PrescriptionItem> addMedicineToPrescription(
            Prescription prescription,
            AddMedicine request
    ) {
        List<PrescriptionItem> prescriptionItems = prescription.getPrescriptionItems();
        PrescriptionItem alreadyExist = prescriptionItems
                .stream()
                .filter(prescriptionItem1 ->
                        prescriptionItem1
                                .getMedicine()
                                .getMedicineId() == request.getMedicineId()
                                && !prescriptionItem1.isDeleted()
                )
                .findFirst()
                .orElse(null);

        if (alreadyExist != null) {
            alreadyExist.setDeleted(true);
            prescriptionItems.remove(alreadyExist);
            prescriptionItemRepository.save(alreadyExist);

            prescription.setTotalCost(
                    prescription.getTotalCost() - alreadyExist.getTotalCost()
            );
        }

        PrescriptionItem prescriptionItem = createPrescriptionItem(
                prescription,
                request
        );
        prescriptionItems.add(prescriptionItem);
        prescription.setPrescriptionItems(prescriptionItems);

        prescription.setTotalCost(
                prescription.getTotalCost() + prescriptionItem.getTotalCost()
        );
        prescriptionServices.savePrescription(prescription);

        return prescriptionItems.stream()
                .filter(prescriptionItem1 -> !prescriptionItem1.isDeleted())
                .toList();
    }

    @Override
    public List<PrescriptionItem> getMedicinesByPrescription(Prescription prescription) {
        return prescriptionItemRepository.findByPrescriptionAndDeletedIsFalse(prescription);
    }

    @Override
    public List<PrescriptionItem> deleteMedicineFromPrescription(Prescription prescription, UUID prescriptionItemId) {
        PrescriptionItem prescriptionItem = prescriptionItemRepository
                .findByPrescriptionAndPrescriptionItemIdAndDeletedIsFalse(
                        prescription,
                        prescriptionItemId
                ).orElseThrow(() -> new NotFoundException("Prescription item not found")
                );

        prescriptionItem.setDeleted(true);
        prescriptionItemRepository.save(prescriptionItem);

        prescription.setTotalCost(
                prescription.getTotalCost() - prescriptionItem.getTotalCost()
        );
        prescriptionServices.savePrescription(prescription);

        return prescriptionItemRepository.findByPrescriptionAndDeletedIsFalse(prescription);
    }

    private PrescriptionItem createPrescriptionItem(
            Prescription prescription,
            AddMedicine request
    ) {
        Medicine medicine = medicineRepository.findById(
                request.getMedicineId()
        ).orElseThrow(() -> new NotFoundException("Medicine not found")
        );

        if (medicine.isDeleted())
            throw new BadRequestException("Medicine is deleted");

        PrescriptionItem prescriptionItem = new PrescriptionItem();
        prescriptionItem.setPrescription(prescription);
        prescriptionItem.setPrescriptionCode(prescription.getPrescriptionCode());
        prescriptionItem.setMedicine(medicine);
        prescriptionItem.setPrice(medicine.getPrice());
        prescriptionItem.setQuantity(request.getQuantity());
        prescriptionItem.setTotalCost(
                medicine.getPrice() * request.getQuantity()
        );

        prescriptionItem.setTimesPerDay(request.getTimesPerDay());
        prescriptionItem.setDays(request.getDays());
        prescriptionItem.setQuantityPerTime(request.getQuantityPerTime());
        prescriptionItem.setMorning(request.isMorning());
        prescriptionItem.setNoon(request.isNoon());
        prescriptionItem.setAfternoon(request.isAfternoon());
        prescriptionItem.setEvening(request.isEvening());

        prescriptionItem.setDosageInstruction(
                request.getNote()
        );
        prescriptionItemRepository.save(prescriptionItem);

        return prescriptionItem;
    }
}
