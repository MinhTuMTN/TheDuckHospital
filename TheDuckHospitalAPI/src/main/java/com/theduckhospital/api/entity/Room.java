package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.theduckhospital.api.constant.RoomType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.Nationalized;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int roomId;

    @Nationalized
    private String roomName;
    @Nationalized
    private String description;
    private boolean deleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Department department;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private List<DoctorSchedule> doctorSchedule;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private List<NurseSchedule> nurseSchedules;

    private RoomType roomType;
    private Integer beingUsed;

    // 2 thuộc tính này reset lại mỗi ngày
    private Integer queueNumber;
    private Integer numberOfPatients;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private List<HospitalAdmission> hospitalAdmissions;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private MedicalService medicalService;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private List<MedicalTest> medicalTests;

    private Date createdDate;
    private Date updatedDate;

    @PrePersist
    private void onCreate() {
        this.createdDate = new Date();
        this.updatedDate = new Date();
    }

    @PreUpdate
    private void onUpdate() {
        this.updatedDate = new Date();
    }
}
