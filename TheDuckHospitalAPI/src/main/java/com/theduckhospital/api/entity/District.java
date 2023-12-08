package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.Columns;
import org.hibernate.annotations.Nationalized;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"})
public class District {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int districtId;

    @Nationalized
    private String districtName;

    private boolean deleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Province province;

    @OneToMany(mappedBy = "district")
    @JsonBackReference
    @ToStringExclude
    private List<Ward> wards;
}
