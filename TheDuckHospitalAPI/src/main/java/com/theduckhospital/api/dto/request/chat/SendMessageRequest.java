package com.theduckhospital.api.dto.request.chat;

import lombok.Data;

import java.util.UUID;

@Data
public class SendMessageRequest {
    private String message;
    private UUID conversationId;
}
