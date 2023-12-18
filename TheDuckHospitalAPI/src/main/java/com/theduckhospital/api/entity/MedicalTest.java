package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.Nationalized;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicalTest {
    @Id
    private UUID medicalTestId;

    private int queueNumber;
    @Nationalized
    private String note;
    private double price;

    private String resultFileUrl; // Bên lab (xét nghiệm) sẽ upload file kết quả lên đây

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private MedicalService medicalService;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private MedicalExaminationRecord medicalExaminationRecord;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private LaboratoryTechnician laboratoryTechnician;

    private Date date;
    private boolean deleted;

    @PrePersist
    public void prePersist() {
        this.medicalTestId = UUID.randomUUID();
    }
}
