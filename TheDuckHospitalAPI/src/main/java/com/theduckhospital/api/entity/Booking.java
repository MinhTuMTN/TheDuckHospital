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
public class Booking {
    @Id
    private UUID bookingId;

    private String bookingCode;

    private int queueNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private PatientProfile patientProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private TimeSlot timeSlot;

    @OneToOne
    @JoinColumn(name = "medicalExaminationRecordId", referencedColumnName = "medicalExaminationRecordId")
    @JsonBackReference
    @ToStringExclude
    private MedicalExaminationRecord medicalExaminationRecord;

    private Date createdAt;
    private Date updatedAt;
    private boolean deleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Transaction transaction;

    @PrePersist
    private void onPersist() {
        this.bookingId = UUID.randomUUID();
        this.bookingCode = this.bookingId.toString()
                .replace("-", "")
                .substring(0, 12)
                .toUpperCase();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @PreUpdate
    private void onUpdate() {
        this.updatedAt = new Date();
    }
}
