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

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HospitalizationDetail {
    @Id
    private UUID hospitalizationDetailId;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    @JsonBackReference
    private HospitalAdmission hospitalAdmission;

    private Date hospitalizationDate;

    @Nationalized
    private String diagnosis;

    @OneToMany(mappedBy = "hospitalizationDetail")
    @ToStringExclude
    @JsonBackReference
    private List<TreatmentMedicine> treatmentMedicines;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    @JsonBackReference
    private Doctor treatingDoctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    @JsonBackReference
    private Nurse nurse;

    private double totalFee;
}
