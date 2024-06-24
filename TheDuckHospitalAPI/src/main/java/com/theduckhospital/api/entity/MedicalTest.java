package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.theduckhospital.api.constant.MedicalExamState;
import com.theduckhospital.api.constant.MedicalTestState;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.Cascade;
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
    private String medicalTestCode;

    private int queueNumber;
    @Nationalized
    private String note;
    @Nationalized
    private String testResult;
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
    private HospitalAdmission hospitalAdmission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private LaboratoryTechnician laboratoryTechnician;

    private MedicalTestState state = MedicalTestState.WAITING;

    private Date date;
    private boolean deleted;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "transactionId", referencedColumnName = "transactionId")
    @JsonBackReference
    @ToStringExclude
    private Transaction transaction;

    @PrePersist
    public void prePersist() {
        this.medicalTestId = UUID.randomUUID();
        this.medicalTestCode = "MT" + this.medicalTestId.toString().substring(0, 13);
    }
}
