package com.theduckhospital.api.dto.response.chat;

import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
public class ConversationResponse {
    private UUID conversationId;
    private UUID userId;
    private String userName;
    private String avatar;
    private boolean lastMessageIsMine;
    private String lastMessage;
    private Date lastMessageDate;
}
