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
    @Nationalized
    protected String fullName;
    protected String phoneNumber;
    protected String identityNumber;
    protected Date dateOfBirth;
    protected Date createdAt;
    protected Date lastModifiedAt;
    protected boolean deleted;

    @OneToMany(mappedBy = "patient")
    private List<PatientProfile> patientProfile;

    @OneToMany(mappedBy = "patient")
    private List<MedicalExaminationRecord> medicalExaminationRecords;

    @PreUpdate
    private void onUpdate() {
        this.lastModifiedAt = new Date();
    }

    @PrePersist
    private void onCreate() {
        this.patientId = UUID.randomUUID();
        this.createdAt = new Date();
        this.lastModifiedAt = new Date();
    }
}
