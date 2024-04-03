package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.apache.commons.lang3.builder.ToStringExclude;

import java.util.Date;

@Entity
@Data
public class Device {
    @Id
    private String jwtTokenId;

    private String deviceId;
    private String deviceName;
    private String systemName;
    private String systemVersion;
    private String fcmToken;
    private boolean deleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Account account;

    private Date lastAccessedAt;
    private Date firstAccessedAt;
}
