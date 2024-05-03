package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.Nationalized;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
public class MedicineReminderDetail {
    @Id
    private UUID medicineReminderDetailId;
    private UUID confirmationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    @JsonBackReference
    private MedicineReminder medicineReminder;

    private Date reminderTime;
    private Integer reminderIndex;

    @Nationalized
    private String medicineName;
    @Nationalized
    private String fullName;

    private float amount;
    private boolean used;

    private Date createdAt;
    private Date updatedAt;
    private boolean deleted;

    private boolean received;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    @JsonBackReference
    private Account account;
    @PrePersist
    public void prePersist() {
        this.medicineReminderDetailId = UUID.randomUUID();
        this.confirmationId = UUID.randomUUID();
        this.used = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deleted = false;
        this.received = false;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = new Date();
    }
}
