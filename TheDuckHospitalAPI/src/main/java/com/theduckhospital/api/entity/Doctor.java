package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.theduckhospital.api.constant.Degree;
import jakarta.persistence.*;
import lombok.*;
import org.apache.commons.lang3.builder.ToStringExclude;

import javax.annotation.Nullable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Doctor extends Staff{
    @Nullable
    private Degree degree;
    private double rating = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    @JsonBackReference
    private Department department;

    private boolean headOfDepartment = false;

    @OneToMany(mappedBy = "doctor")
    @JsonBackReference
    @ToStringExclude
    private List<Rating> ratings;

    @OneToMany(mappedBy = "doctor")
    @ToStringExclude
    @JsonBackReference
    private List<DoctorSchedule> doctorSchedules = new ArrayList<>();

    @OneToMany(mappedBy = "doctor")
    @JsonBackReference
    @ToStringExclude
    private List<HospitalAdmission> hospitalAdmissions;

    @OneToMany(mappedBy = "treatingDoctor")
    @JsonBackReference
    @ToStringExclude
    private List<HospitalizationDetail> hospitalizationDetails;

    @OneToMany(mappedBy = "doctor")
    @JsonBackReference
    @ToStringExclude
    private List<Discharge> discharges;
}
