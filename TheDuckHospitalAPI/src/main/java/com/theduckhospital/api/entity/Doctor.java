package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.theduckhospital.api.constant.Degree;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.*;
import org.apache.commons.lang3.builder.ToStringExclude;

import javax.annotation.Nullable;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Doctor extends Staff{
    @Nullable
    private Degree degree;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToStringExclude
    @JsonBackReference
    private Department department;

    private boolean headOfDepartment = false;
}
