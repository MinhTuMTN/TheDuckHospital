package com.theduckhospital.api.dto.request.chat;

import lombok.Data;

import java.util.UUID;

@Data
public class AcceptConversationRequest {
    private UUID conversationId;
}
