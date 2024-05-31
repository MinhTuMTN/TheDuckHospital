package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.Nationalized;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class TreatmentMedicine {
    @Id
    private UUID treatmentMedicineId;

    @Nationalized
    private String medicineName;

    private double quantity;
    private double unitPrice;
    private double totalAmount;

    @Nationalized
    private String note;

    private boolean morning;
    private boolean afternoon;
    private boolean evening;
    private boolean night;

    private boolean deleted;

    private Date usageDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    @JsonBackReference
    private HospitalizationDetail hospitalizationDetail;
}
