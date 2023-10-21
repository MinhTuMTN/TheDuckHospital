package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
public class Address {
    @Id
    private UUID addressId;
    private String streetName;
    private Date createdAt;
    private Date lastModified;
    private boolean deleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Ward ward;

}
