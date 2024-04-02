package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.theduckhospital.api.constant.NotificationState;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.Nationalized;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
public class Notification {
    @Id
    private UUID notificationId;

    @Nationalized
    private String title;
    @Nationalized
    private String content;
    @Nationalized
    private String data;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Account account;

    private Date createdAt;
    private Date lastModifiedAt;
    private boolean deleted;
    private NotificationState state = NotificationState.NOT_RECEIVED;
}
