package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.theduckhospital.api.constant.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID userId;

    @Nationalized
    private String fullName;

    @Email
    private String email;

    @JsonBackReference
    private String password;
    private String phoneNumber;
    private String avatar;
    private Integer numberOfProfile;
    private boolean deleted;

    @JsonBackReference
    private int otp;
    @JsonBackReference
    private int otpCount;
    @JsonBackReference
    private Date otpCreatedAt;
    @JsonBackReference
    private Date otpExpiredAt;

    private Date createdAt;
    private Date lastModifiedAt;

    private BigDecimal balance;
    private String walletPin;
    private Boolean walletLocked;
    private Integer walletPinCount;
    private Date walletCreatedAt;

    @PrePersist
    private void onCreate() {
        this.createdAt = new Date();
        this.lastModifiedAt = new Date();
        this.numberOfProfile = 0;
        this.balance = null;
        this.walletLocked = true;
        this.walletPinCount = 0;
        this.walletCreatedAt = null;
    }

    @PreUpdate
    private void onUpdate() {
        this.lastModifiedAt = new Date();
    }

    @OneToMany(mappedBy = "account")
    @JsonBackReference
    @ToStringExclude
    private List<PatientProfile> patientProfile;

    @OneToMany(mappedBy = "account")
    @JsonBackReference
    @ToStringExclude
    private List<Device> devices;

    @OneToMany(mappedBy = "account")
    @JsonBackReference
    @ToStringExclude
    private List<Notification> notifications;

    @OneToMany(mappedBy = "account")
    @JsonBackReference
    @ToStringExclude
    private List<Transaction> transactions;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "staffId", referencedColumnName = "staffId")
    @JsonBackReference
    private Staff staff;

    @OneToMany(mappedBy = "account")
    @JsonBackReference
    @ToStringExclude
    private List<Conversation> conversations;
}
