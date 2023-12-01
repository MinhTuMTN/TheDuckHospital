package com.theduckhospital.api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;

@Entity
public class Doctor extends Staff{
    @ManyToOne(fetch = FetchType.LAZY)
    private Department department;
}
