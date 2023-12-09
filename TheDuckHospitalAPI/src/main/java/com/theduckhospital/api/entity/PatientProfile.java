package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.theduckhospital.api.constant.Gender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.Nationalized;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientProfile {
    @Id
    private UUID patientProfileId;

    @Nationalized
    private String fullName;
    private String phoneNumber;
    private String email;
    private Gender gender;
    private String identityNumber;

    @Nationalized
    private String streetName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Ward ward;

    private Date dateOfBirth;
    private Date createdAt;
    private Date lastModifiedAt;
    private boolean deleted;

    @PrePersist
    private void onCreate() {
        this.patientProfileId = UUID.randomUUID();
        this.createdAt = new Date();
        this.lastModifiedAt = new Date();
    }

    @PreUpdate
    private void onUpdate() {
        this.lastModifiedAt = new Date();
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Nation nation;

    @OneToMany(mappedBy = "patientProfile")
    @ToStringExclude
    @JsonBackReference
    private List<MedicalExaminationRecord> medicalExaminationRecords;

    @OneToMany(mappedBy = "patientProfile")
    @ToStringExclude
    @JsonBackReference
    private List<Booking> bookings;
}
