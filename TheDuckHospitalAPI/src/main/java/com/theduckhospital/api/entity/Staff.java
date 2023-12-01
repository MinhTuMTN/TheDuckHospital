package com.theduckhospital.api.entity;

import com.theduckhospital.api.constant.Gender;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Staff {
    @Id
    private String staffId;
    private String fullName;
    private Gender gender;
    private String identityNumber;
    private String phoneNumber;
    private String email;
    private Date dateOfBirth;
    private Date createdAt;
    private Date lastModifiedAt;
    private boolean deleted;
}
