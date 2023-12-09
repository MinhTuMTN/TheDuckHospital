package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    private UUID bookingId;

    private int queueNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private MedicalService medicalService;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private PatientProfile patientProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private DoctorSchedule doctorSchedule;

    @OneToOne
    @JoinColumn(name = "medicalExaminationRecordId", referencedColumnName = "medicalExaminationRecordId")
    @JsonBackReference
    @ToStringExclude
    private MedicalExaminationRecord medicalExaminationRecord;

    @OneToOne(mappedBy = "booking", fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Transaction transaction;
}
