package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.theduckhospital.api.constant.ServiceType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.Nationalized;

import java.util.Date;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class MedicalService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int serviceId;

    @Nationalized
    private String serviceName;
    @Nationalized
    private String description;

    // Department
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Department department;

    @OneToMany(mappedBy = "medicalService")
    @JsonBackReference
    @ToStringExclude
    private List<MedicalTest> medicalTests;

    @OneToMany(mappedBy = "medicalService")
    @JsonBackReference
    @ToStringExclude
    private List<Room> rooms;

    @OneToMany(mappedBy = "medicalService")
    @JsonBackReference
    @ToStringExclude
    private List<DoctorSchedule> doctorSchedules;

    private ServiceType serviceType;
    private double price = 150000;

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
