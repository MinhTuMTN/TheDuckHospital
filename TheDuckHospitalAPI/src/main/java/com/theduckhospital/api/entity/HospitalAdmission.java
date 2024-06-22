package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.theduckhospital.api.constant.HospitalAdmissionState;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.Nationalized;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HospitalAdmission {
    @Id
    private UUID hospitalAdmissionId;
    private String hospitalAdmissionCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    @JsonBackReference
    private PatientProfile patientProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    @JsonBackReference
    private Doctor doctor;
    @Nationalized
    private String doctorName;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    @JsonBackReference
    private Nurse nurse;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    @JsonBackReference
    private Department department;

    private Date admissionDate;
    @Nationalized
    private String diagnosis;
    @Nationalized
    private String symptom;


    private double roomFee;

    private double debtFee;
    private double paidFee;
    private double totalFee;

    private HospitalAdmissionState state;

    @OneToMany(mappedBy = "hospitalAdmission")
    @ToStringExclude
    @JsonBackReference
    private List<HospitalizationDetail> hospitalizationDetails;

    @OneToMany(mappedBy = "hospitalAdmission")
    @ToStringExclude
    @JsonBackReference
    private List<MedicalTest> medicalTests;

    @OneToMany(mappedBy = "hospitalAdmission")
    @ToStringExclude
    @JsonBackReference
    private List<Transaction> transactions = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    @JsonBackReference
    private Room room;

    @OneToOne(mappedBy = "hospitalAdmission", fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Discharge discharge;

    @OneToOne
    @JoinColumn(name = "medicalExaminationRecordId", referencedColumnName = "medicalExaminationRecordId")
    @JsonBackReference
    @ToStringExclude
    private  MedicalExaminationRecord medicalExaminationRecord;

    private Date createdAt;
    private Date updatedAt;
    private boolean deleted;

    @PrePersist
    public void prePersist() {
        this.hospitalAdmissionId = UUID.randomUUID();
        this.hospitalAdmissionCode = "HA" + this.hospitalAdmissionId
                .toString()
                .substring(0, 13)
                .toUpperCase();
        this.debtFee = 0;
        this.paidFee = 0;
        this.totalFee = 0;
        this.state = HospitalAdmissionState.WAITING_FOR_PAYMENT;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deleted = false;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = new Date();
    }
}
