package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.theduckhospital.api.constant.Gender;
import jakarta.persistence.*;
import lombok.*;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.Nationalized;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Staff {
    @Id
    protected UUID staffId;

    @Nationalized
    protected String fullName;
    protected String phoneNumber;
    protected String identityNumber;
    protected Gender gender;
    protected Date dateOfBirth;
    protected Date createdAt;
    protected Date lastModifiedAt;
    protected String avatar;
    protected boolean deleted;
    protected String msGraphId;

    @OneToOne(mappedBy = "staff", fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Account account;

    @PreUpdate
    private void onUpdate() {
        this.lastModifiedAt = new Date();
    }
    @PrePersist
    private void onCreate() {
        this.staffId = java.util.UUID.randomUUID();
        this.createdAt = new Date();
        this.lastModifiedAt = new Date();
    }
}
