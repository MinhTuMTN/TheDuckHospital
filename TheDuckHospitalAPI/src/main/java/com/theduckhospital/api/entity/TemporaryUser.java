package com.theduckhospital.api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TemporaryUser {
    @Id
    private UUID temporaryUserId;
    private String phoneNumber;

    private int otp;
    private int otpCount;
    private Date otpCreatedAt;
    private Date otpExpiredAt;

    private boolean deleted;
    private Date createdAt;
    private Date updatedAt;

    @PrePersist
    public void prePersist() {
        this.temporaryUserId = UUID.randomUUID();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = new Date();
    }
}
