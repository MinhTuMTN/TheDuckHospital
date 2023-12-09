package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.theduckhospital.api.constant.TransactionStatus;
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
@Table(name = "transactions")
public class Transaction {
    @Id
    private UUID transactionId;

    private double amount;
    private TransactionStatus status;
    private Date createdAt;
    private Date lastModifiedAt;
    private boolean deleted;

    @OneToOne
    @JoinColumn(name = "bookingId", referencedColumnName = "bookingId")
    @ToStringExclude
    @JsonBackReference
    private Booking booking;
}
