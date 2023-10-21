package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
public class Provine {
    @Id
    private byte provineId;
    private String provineName;
    private Date createdAt;
    private Date lastModified;
    private boolean deleted;

    @OneToMany(mappedBy = "provine", cascade = {CascadeType.PERSIST, CascadeType.MERGE} )
    @JsonBackReference
    private List<District> districts;

}
