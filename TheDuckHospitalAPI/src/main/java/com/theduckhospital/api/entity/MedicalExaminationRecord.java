package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.Nationalized;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class MedicalExaminationRecord {
    @Id
    private UUID medicalExaminationRecordId;

    @OneToOne(mappedBy = "medicalExaminationRecord", fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Booking booking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private DoctorSchedule doctorSchedule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private PatientProfile patientProfile;

    @OneToMany(mappedBy = "medicalExaminationRecord", fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private List<MedicalTest> medicalTest;

    @OneToOne(mappedBy = "medicalExaminationRecord", fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Prescription prescription;

    @Nationalized
    private String symptom;

    @Nationalized
    private String diagnosis;
    private Date reExaminationDate;

    private boolean deleted;
    private Date createdDate;
    private Date updatedDate;

    @PrePersist
    public void prePersist() {
        this.medicalExaminationRecordId = UUID.randomUUID();
        this.createdDate = new Date();
        this.updatedDate = new Date();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedDate = new Date();
    }
}
