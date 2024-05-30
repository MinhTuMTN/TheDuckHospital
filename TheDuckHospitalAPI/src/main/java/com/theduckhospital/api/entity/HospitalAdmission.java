package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.theduckhospital.api.constant.HospitalAdmissionState;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
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
public class HospitalAdmission {
    @Id
    private UUID hospitalAdmissionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    @JsonBackReference
    private PatientProfile patientProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    @JsonBackReference
    private Doctor doctor;

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
    private List<Transaction> transactions;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    @JsonBackReference
    private Room room;

    @OneToOne(mappedBy = "hospitalAdmission", fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Discharge discharge;
}
