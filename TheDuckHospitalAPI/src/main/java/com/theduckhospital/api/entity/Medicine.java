package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.theduckhospital.api.constant.MedicineUnit;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.Nationalized;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int medicineId;

    @Nationalized
    private String medicineName;
    private double price;
    private int quantity;

    private MedicineUnit unit;
    private Date createdAt;
    private Date lastModifiedAt;
    private boolean deleted;

    @OneToMany(mappedBy = "medicine")
    @JsonBackReference
    @ToStringExclude
    private List<PrescriptionItem> prescriptionItem;

    @OneToMany(mappedBy = "medicine")
    @ToStringExclude
    @JsonBackReference
    private List<TreatmentMedicine> treatmentMedicines;

    @PrePersist
    private void onCreate() {
        this.createdAt = new Date();
        this.lastModifiedAt = new Date();
    }

    @PreUpdate
    private void onUpdate() {
        this.lastModifiedAt = new Date();
    }
}
