package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.entity.Medicine;
import com.theduckhospital.api.entity.PrescriptionItem;
import lombok.Data;

import java.util.UUID;

@Data
public class PrescriptionItemResponse {
    private UUID prescriptionItemId;
    private Medicine medicine;
    private int quantity;
    private String dosageInstruction;
    private double total;

    public PrescriptionItemResponse(PrescriptionItem prescriptionItem) {
        this.prescriptionItemId = prescriptionItem.getPrescriptionItemId();
        this.medicine = prescriptionItem.getMedicine();
        this.quantity = prescriptionItem.getQuantity();
        this.dosageInstruction = prescriptionItem.getDosageInstruction();
        this.total = prescriptionItem.getQuantity() * prescriptionItem.getMedicine().getPrice();
    }
}
