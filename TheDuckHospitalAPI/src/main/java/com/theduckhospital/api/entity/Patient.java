package com.theduckhospital.api.entity;

import com.theduckhospital.api.constant.Gender;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;
import java.util.UUID;
@Entity
@Data
public class Patient {
    @Id
    private UUID patientId;
    private String fullName;
    private Date dateOfBirth;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String identificationCard;
    private Date createdAt;
    private Date lastModified;
    private boolean deleted;

}
