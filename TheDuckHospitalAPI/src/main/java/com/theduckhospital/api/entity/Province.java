package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.Nationalized;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"})
public class Province {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int provinceId;

    @Nationalized
    private String provinceName;

    private boolean deleted = false;

    @OneToMany(mappedBy = "province")
    @JsonBackReference
    @ToStringExclude
    private List<District> districts;
}
