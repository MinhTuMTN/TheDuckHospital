package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.entity.MedicalExaminationRecord;
import lombok.Data;

import java.util.List;

@Data
public class PatientHistoryMedicalRecord {
    private String profileName;
    private List<MedicalRecordItem> items;

    public PatientHistoryMedicalRecord(String profileName, List<MedicalExaminationRecord> items) {
        this.profileName = profileName;
        this.items = items.stream()
                .map(MedicalRecordItem::new)
                .toList();
    }
}
