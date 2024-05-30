package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.theduckhospital.api.constant.ScheduleSession;
import com.theduckhospital.api.constant.ScheduleType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Room room;

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
