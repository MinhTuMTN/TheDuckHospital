package com.theduckhospital.api.dto.request.chat;

import com.theduckhospital.api.entity.Conversation;
import com.theduckhospital.api.entity.Message;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MessagesResponse {
    private Conversation conversation;
    private List<Message> messages;
}
