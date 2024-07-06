package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.theduckhospital.api.constant.PaymentType;
import com.theduckhospital.api.constant.TransactionStatus;
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
@Table(name = "transactions")
public class Transaction {
    @Id
    private UUID transactionId;

    private double amount;
    private Double fee = 0D;
    private TransactionStatus status;
    private Date createdAt;
    private Date lastModifiedAt;
    private boolean deleted;
    private String bankCode;
    private String paymentMethod;
    private String origin;
    private String momoTransactionId;

    @OneToMany(mappedBy = "transaction")
    @JsonBackReference
    @ToStringExclude
    private List<Booking> bookings;

    @OneToOne(mappedBy = "transaction", fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private MedicalTest medicalTest;

    @OneToOne(mappedBy = "transaction", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonBackReference
    @ToStringExclude
    private Discharge discharge;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private HospitalAdmission hospitalAdmission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Cashier cashier;

    private PaymentType paymentType;

    @PrePersist
    public void prePersist() {
        this.transactionId = UUID.randomUUID();
        this.createdAt = new Date();
        this.lastModifiedAt = new Date();
        this.status = TransactionStatus.PENDING;
    }

    @PreUpdate
    public void preUpdate() {
        this.lastModifiedAt = new Date();
    }
}
