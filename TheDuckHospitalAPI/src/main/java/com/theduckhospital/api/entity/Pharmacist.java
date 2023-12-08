package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.ToStringExclude;

import java.util.List;

@Getter
@Setter
@Entity
public class Pharmacist extends Staff{
    @OneToMany(mappedBy = "pharmacist")
    @JsonBackReference
    @ToStringExclude
    private List<Prescription> prescriptions;
}
