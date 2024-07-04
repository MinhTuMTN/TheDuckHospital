package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.theduckhospital.api.constant.MedicineUnit;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.Nationalized;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class TreatmentMedicine {
    @Id
    private UUID treatmentMedicineId;

    @Nationalized
    private String medicineName;
    private int medicineId;
    private MedicineUnit unit;

    private double quantityPerTime;
    private double quantity;
    private double unitPrice;
    private double totalAmount;

    @Nationalized
    private String note;

    private boolean morning;
    private boolean afternoon;
    private boolean evening;
    private boolean night;

    private boolean deleteFromTomorrow;

    private boolean deleted;
    private Date createdAt;
    private Date lastModifiedAt;

    private Date usageDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    @JsonBackReference
    private HospitalizationDetail hospitalizationDetail;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    @JsonBackReference
    private Medicine medicine;

    @PrePersist
    private void onCreate() {
        this.createdAt = new Date();
        this.lastModifiedAt = new Date();
        this.treatmentMedicineId = UUID.randomUUID();
    }

    @PreUpdate
    private void onUpdate() {
        this.lastModifiedAt = new Date();
    }
}
