package com.theduckhospital.api.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
    @Id
    private UUID patientId;

    private String patientCode;
    @Nationalized
    protected String fullName;
    protected String phoneNumber;
    protected String identityNumber;
    protected Date dateOfBirth;
    protected Date createdAt;
    protected Date lastModifiedAt;
    protected boolean deleted;


    @OneToMany(mappedBy = "patient")
    private List<MedicalExaminationRecord> medicalExaminationRecords;


    @OneToMany(mappedBy = "patient")
    private List<PatientProfile> patientProfiles;

    @PreUpdate
    private void onUpdate() {
        this.lastModifiedAt = new Date();
    }

    @PrePersist
    private void onCreate() {
        this.patientId = UUID.randomUUID();
        this.patientCode = "BN" + this.patientId.toString().substring(0, 8).toUpperCase();
        this.createdAt = new Date();
        this.lastModifiedAt = new Date();
    }
}
