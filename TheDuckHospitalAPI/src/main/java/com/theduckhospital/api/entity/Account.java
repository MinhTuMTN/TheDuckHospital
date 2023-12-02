package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.theduckhospital.api.constant.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.Cascade;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID userId;

    private String fullName;

    @Email
    private String email;

    @JsonBackReference
    private String password;
    private String phoneNumber;
    private boolean deleted;

    private int otp;
    private int otpCount;
    private Date otpCreatedAt;
    private Date otpExpiredAt;

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

    @OneToMany(mappedBy = "account")
    @JsonBackReference
    @ToStringExclude
    private List<PatientProfile> patientProfile;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "staffId", referencedColumnName = "staffId")
    @JsonBackReference
    private Staff staff;
}
