package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrescriptionItem {
    @Id
    private UUID prescriptionItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Medicine medicine;

    private int quantity;
    private String dosageInstruction;

    private Date createdAt;
    private Date lastModifiedAt;
    private boolean deleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Prescription prescription;

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
