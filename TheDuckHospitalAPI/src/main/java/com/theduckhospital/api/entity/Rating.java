package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.Nationalized;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rating {
    @Id
    private UUID ratingId;
    @Nationalized
    private String review;
    private int ratingPoint;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Doctor doctor;

    @OneToOne
    @JoinColumn(
            name = "bookingId",
            referencedColumnName = "bookingId"
    )
    @JsonBackReference
    @ToStringExclude
    private Booking booking;

    private Date createdAt;
    private boolean deleted;

    @PrePersist
    private void onCreate() {
        this.ratingId = UUID.randomUUID();
        this.createdAt = new Date();
    }
}
