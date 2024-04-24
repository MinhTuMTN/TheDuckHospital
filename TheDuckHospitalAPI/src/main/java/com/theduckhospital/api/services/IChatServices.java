package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.chat.MessagesResponse;
import com.theduckhospital.api.dto.request.chat.SendMessageRequest;
import java.util.UUID;

public interface IChatServices {
    UUID sendMessage(String token, SendMessageRequest request);
    UUID acceptConversation(String token, UUID conversationId);
    MessagesResponse getMessages(String token, String conversationId, int sequenceNumber, String direction);
}
