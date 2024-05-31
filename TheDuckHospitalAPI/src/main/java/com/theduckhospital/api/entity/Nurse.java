package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.theduckhospital.api.constant.NurseType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.ToStringExclude;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class Nurse extends Staff{
    private boolean headOfDepartment = false;
    private NurseType nurseType;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    @JsonBackReference
    private Department department;

    @OneToMany(mappedBy = "nurse")
    @JsonBackReference
    @ToStringExclude
    private List<HospitalAdmission> hospitalAdmissions;

    @OneToMany(mappedBy = "nurse")
    @JsonBackReference
    @ToStringExclude
    private List<HospitalizationDetail> hospitalizationDetails;

    @OneToMany(mappedBy = "nurse")
    @ToStringExclude
    @JsonBackReference
    private List<Discharge> discharges = new ArrayList<>();

    @OneToMany(mappedBy = "nurse")
    @ToStringExclude
    @JsonBackReference
    private List<NurseSchedule> nurseSchedules = new ArrayList<>();
}
