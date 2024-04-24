package com.theduckhospital.api.repository;

import com.theduckhospital.api.constant.ConversationState;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, UUID> {
    Optional<Conversation> findByAccountAndState(Account account, ConversationState state);
    boolean existsByAccountAndState(Account account, ConversationState state);
    Optional<Conversation> findByConversationId(UUID conversationId);
}
