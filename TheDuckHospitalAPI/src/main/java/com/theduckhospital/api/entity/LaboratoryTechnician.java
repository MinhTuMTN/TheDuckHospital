package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.builder.ToStringExclude;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class LaboratoryTechnician extends Staff{
    @OneToMany(mappedBy = "laboratoryTechnician")
    @JsonBackReference
    @ToStringExclude
    private List<MedicalTest> medicalTests;
}
