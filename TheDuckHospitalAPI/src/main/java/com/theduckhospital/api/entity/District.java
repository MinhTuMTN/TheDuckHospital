package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@Entity
public class District {
    @Id
    private UUID districtId;
    private String districtName;
    private Date createdAt;
    private Date lastModified;
    private boolean deleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Provine provine;

    @OneToMany(mappedBy = "district")
    @JsonBackReference
    private List<Ward> wardList;

}
