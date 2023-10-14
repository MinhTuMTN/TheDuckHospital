package com.theduckhospital.api.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID userId;

    private String email;
    private String password;
    private String phoneNumber;
    private boolean emailVerified;
    private boolean phoneNumberVerified;
    private boolean deleted;
    private String role;
}
