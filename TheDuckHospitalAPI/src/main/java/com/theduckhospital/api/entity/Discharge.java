package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class Discharge {
    @Id
    private UUID dischargeId;

    @Nationalized
    private String dischargeSummary;
    private Date dischargeDate;
    private Date reExaminationDate;

    @OneToOne(mappedBy = "discharge", fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Prescription prescription;

    @OneToOne
    @JoinColumn(name = "hospitalAdmissionId", referencedColumnName = "hospitalAdmissionId")
    @JsonBackReference
    @ToStringExclude
    private HospitalAdmission hospitalAdmission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Nurse nurse;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Doctor doctor;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "transactionId", referencedColumnName = "transactionId")
    @JsonBackReference
    @ToStringExclude
    private Transaction transaction;

    private Date createdAt;
    private Date lastModifiedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = new Date();
        this.lastModifiedAt = new Date();
        this.dischargeId = UUID.randomUUID();
    }

    @PreUpdate
    public void preUpdate() {
        this.lastModifiedAt = new Date();
    }
}
