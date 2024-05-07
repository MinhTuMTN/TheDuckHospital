package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Prescription {
    @Id
    private UUID prescriptionId;
    private String prescriptionCode;

    private double totalCost;

    @OneToOne
    @JoinColumn(name = "medicalExaminationRecordId", referencedColumnName = "medicalExaminationRecordId")
    @JsonBackReference
    @ToStringExclude
    private MedicalExaminationRecord medicalExaminationRecord;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Pharmacist pharmacist;

    @OneToMany(mappedBy = "prescription", fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private List<PrescriptionItem> prescriptionItems;

    private Date createdAt;
    private Date lastModifiedAt;
    private boolean deleted;
    @PrePersist
    public void prePersist() {
        UUID uuid = UUID.randomUUID();
        this.prescriptionId = uuid;
        this.prescriptionCode = uuid.toString()
                .substring(0, 13)
                .toUpperCase()
                .replace("-", "");
        this.createdAt = new Date();
        this.lastModifiedAt = new Date();
        this.deleted = false;
    }

    @PreUpdate
    public void preUpdate() {
        this.lastModifiedAt = new Date();
    }
}
