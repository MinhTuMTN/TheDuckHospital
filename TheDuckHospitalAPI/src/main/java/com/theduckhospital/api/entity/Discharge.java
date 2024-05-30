package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.Nationalized;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class Discharge {
    @Id
    private UUID dischargeId;

    @Nationalized
    private String dischargeSummary;
    private Date dischargeDate;
    private Date reExaminationDate;

    @OneToOne(mappedBy = "discharge", fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Prescription prescription;

    @OneToOne
    @JoinColumn(name = "hospitalAdmissionId", referencedColumnName = "hospitalAdmissionId")
    @JsonBackReference
    @ToStringExclude
    private HospitalAdmission hospitalAdmission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Nurse nurse;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Doctor doctor;
}
