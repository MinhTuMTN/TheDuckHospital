package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.theduckhospital.api.constant.ScheduleSession;
import com.theduckhospital.api.constant.ScheduleType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorSchedule {
    @Id
    private UUID doctorScheduleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Room room;

    @OneToMany(mappedBy = "doctorSchedule", fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private List<MedicalExaminationRecord> medicalExaminationRecords;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private MedicalService medicalService;

    @OneToMany(mappedBy = "doctorSchedule", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonBackReference
    @ToStringExclude
    private List<TimeSlot> timeSlots;

    private int slot = 0;
    private int queueNumber = 0;
    private int dayOfWeek = 0;
    private Date date;

    private ScheduleSession scheduleSession;
    private ScheduleType scheduleType;

    private boolean deleted;
    private Date createdDate;
    private Date updatedDate;

    @PrePersist
    public void prePersist() {
        this.createdDate = new Date();
        this.updatedDate = new Date();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedDate = new Date();
    }
}
