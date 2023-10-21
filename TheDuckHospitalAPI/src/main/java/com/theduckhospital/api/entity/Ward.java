package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@Entity
public class Ward {
    @Id
    private UUID wardId;
    private String wardName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private District district;
    private Date createdAt;
    private Date lastModified;
    private boolean deleted;

    @OneToMany(mappedBy = "ward")
    @JsonBackReference
    private List<Address> addresses;

}
