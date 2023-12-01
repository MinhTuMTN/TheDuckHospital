package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Province {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int provinceId;
    private String provinceName;

    @OneToMany(mappedBy = "province")
    @JsonBackReference
    @ToStringExclude
    private List<District> districts;
}
