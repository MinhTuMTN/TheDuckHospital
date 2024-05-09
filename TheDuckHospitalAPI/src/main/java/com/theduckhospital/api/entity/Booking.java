package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.Nationalized;

import java.util.Date;
import java.util.List;
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

    private boolean rated = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private PatientProfile patientProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private TimeSlot timeSlot;

    @OneToOne
    @JoinColumn(
            name = "medicalExaminationRecordId",
            referencedColumnName = "medicalExaminationRecordId"
    )
    @JsonBackReference
    @ToStringExclude
    private MedicalExaminationRecord medicalExaminationRecord;

    @OneToOne(mappedBy = "booking", fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Rating rating;

    private Date createdAt;
    private Date updatedAt;
    private boolean deleted;
    private boolean cancelled;
    private UUID refundedTransactionId;
    private UUID refundedConversationId;

    @Nationalized
    private String refundReason;

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
        this.cancelled = false;
        this.deleted = false;
    }

    @PreUpdate
    private void onUpdate() {
        this.updatedAt = new Date();
    }
}
