package com.theduckhospital.api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
@Entity
public class PatientProfile {
    @Id
    private UUID patientProfileId;
    private String phoneNumber;
    private String email;
    private Date createdAt;
    private Date lastModified;
    private boolean deleted;

}
