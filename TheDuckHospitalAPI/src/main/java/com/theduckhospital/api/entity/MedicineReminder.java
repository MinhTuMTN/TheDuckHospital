package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import org.apache.commons.lang3.builder.ToStringExclude;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
public class MedicineReminder {
    @Id
    private UUID medicineReminderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    private PrescriptionItem prescriptionItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    @JsonBackReference
    private PatientProfile patientProfile;

    private Date startDate;
    private Date endDate;
    private float amount;
    private float remainingAmount;

    @OneToMany(mappedBy = "medicineReminder")
    @ToStringExclude
    @JsonBackReference
    private List<MedicineReminderDetail> listMedicineReminderDetail;

    private Date createdAt;
    private Date updatedAt;
    private boolean deleted;

    @PrePersist
    public void prePersist() {
        this.medicineReminderId = UUID.randomUUID();
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deleted = false;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = new Date();
    }
}
