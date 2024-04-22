package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Conversation;
import com.theduckhospital.api.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Message, UUID> {
    Page<Message> getMessagesByConversationAndSequenceNumberGreaterThanOrderBySequenceNumber(
            Conversation conversation,
            int sequenceNumber,
            Pageable pageable
    );

    Page<Message> getMessagesByConversationAndSequenceNumberLessThanOrderBySequenceNumberDesc(
            Conversation conversation,
            int sequenceNumber,
            Pageable pageable
    );
}
