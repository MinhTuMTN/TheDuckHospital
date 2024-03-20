package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import org.apache.commons.lang3.builder.ToStringExclude;

import java.util.Date;
import java.util.List;

@Entity
@Data
public class TimeSlot {
    @Id
    private String timeSlotId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private DoctorSchedule doctorSchedule;

    private int maxSlot;
    private int currentSlot;
    private int startNumber;

    private int timeId;
    private Date date;

    private Date createdAt;
    private Date updatedAt;
    private boolean deleted;

    @OneToMany(mappedBy = "timeSlot", fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private List<Booking> bookings;

    public TimeSlot(DoctorSchedule doctorSchedule, int maxSlot, int startNumber, int timeId) {
        this.doctorSchedule = doctorSchedule;
        this.date = doctorSchedule.getDate();
        this.maxSlot = maxSlot;
        this.currentSlot = 0;
        this.startNumber = startNumber;
        this.timeId = timeId;

        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deleted = false;

        this.timeSlotId = timeId + "-" + doctorSchedule.getDoctorScheduleId();
    }

    public TimeSlot() {

    }
}
