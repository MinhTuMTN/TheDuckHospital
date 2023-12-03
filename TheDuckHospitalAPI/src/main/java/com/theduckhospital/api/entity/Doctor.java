package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.ToStringExclude;

import javax.annotation.Nullable;

@Entity
@Getter
@Setter
public class Doctor extends Staff{
    @Nullable
    private String degree;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    @JsonBackReference
    private Department department;

    private boolean headOfDepartment = false;
}
