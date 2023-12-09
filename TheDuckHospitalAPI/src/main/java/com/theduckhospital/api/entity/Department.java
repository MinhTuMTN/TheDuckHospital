package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.Nationalized;

import java.util.Date;
import java.util.List;

@Data
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int departmentId;
    @Nationalized
    private String departmentName;
    @Nationalized
    private String description;
    private boolean deleted;
    private Date createdAt;
    private Date lastModifiedAt;

    @OneToMany(mappedBy = "department")
    @ToString.Exclude
    @JsonBackReference
    private List<Doctor> doctors;

    @OneToMany(mappedBy = "department")
    @ToString.Exclude
    @JsonBackReference
    private List<Room> rooms;

    @OneToMany(mappedBy = "department")
    @ToString.Exclude
    @JsonBackReference
    private List<MedicalService> medicalServices;

    @PrePersist
    private void onCreate() {
        this.createdAt = new Date();
        this.lastModifiedAt = new Date();
    }

    @PreUpdate
    private void onUpdate() {
        this.lastModifiedAt = new Date();
    }
}
