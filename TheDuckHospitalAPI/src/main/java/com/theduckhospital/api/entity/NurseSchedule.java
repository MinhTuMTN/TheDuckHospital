package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.theduckhospital.api.constant.ScheduleSession;
import com.theduckhospital.api.constant.ScheduleType;
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
public class NurseSchedule {
    @Id
    private UUID nurseScheduleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Nurse nurse;
    @Nationalized
    private String nurseName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Room room;

    private String roomName;

    // For INPATIENT_SCHEDULE Only
    private Date date;

    // For EXAMINATION_SCHEDULE Only
    private int dayOfWeek;

    private ScheduleSession scheduleSession;
    private ScheduleType scheduleType;

    private boolean deleted;
    private Date createdDate;
    private Date updatedDate;

    @PrePersist
    public void prePersist() {
        this.nurseScheduleId = UUID.randomUUID();
        this.createdDate = new Date();
        this.updatedDate = new Date();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedDate = new Date();
    }
}
