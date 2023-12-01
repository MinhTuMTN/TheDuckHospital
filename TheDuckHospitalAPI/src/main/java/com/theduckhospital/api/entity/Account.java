package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.theduckhospital.api.constant.Role;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID userId;

    private String email;

    @JsonBackReference
    private String password;
    private String phoneNumber;
    private boolean emailVerified;
    private boolean phoneNumberVerified;
    private boolean deleted;
    private Role role;
    private Date createdAt;
    private Date lastModifiedAt;

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
