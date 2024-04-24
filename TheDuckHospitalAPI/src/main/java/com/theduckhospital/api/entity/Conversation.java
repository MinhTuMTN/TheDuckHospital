package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.theduckhospital.api.constant.ConversationState;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Conversation {
    @Id
    private UUID conversationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private SupportAgent supportAgent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @ToStringExclude
    private Account account;

    private ConversationState state;
    private int maxSequenceNumber;

    private Date createdAt;
    private Date lastModifiedAt;

    @OneToMany(mappedBy = "conversation")
    @JsonBackReference
    @ToStringExclude
    private List<Message> messages;

    @PrePersist
    private void onCreate() {
        this.conversationId = java.util.UUID.randomUUID();
        this.createdAt = new Date();
        this.lastModifiedAt = new Date();
        this.maxSequenceNumber = 0;
    }

    @PreUpdate
    private void onUpdate() {
        this.lastModifiedAt = new Date();
    }
}
