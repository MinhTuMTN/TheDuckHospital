package com.theduckhospital.api.services.impl;

import com.google.common.collect.Lists;
import com.theduckhospital.api.constant.ConversationState;
import com.theduckhospital.api.dto.request.chat.MessagesResponse;
import com.theduckhospital.api.dto.request.chat.SendMessageRequest;
import com.theduckhospital.api.dto.response.chat.ConversationResponse;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Conversation;
import com.theduckhospital.api.entity.Message;
import com.theduckhospital.api.entity.SupportAgent;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.repository.ConversationRepository;
import com.theduckhospital.api.repository.MessageRepository;
import com.theduckhospital.api.services.IAccountServices;
import com.theduckhospital.api.services.IChatServices;
import com.theduckhospital.api.services.IFirebaseServices;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ChatServicesImpl implements IChatServices {
    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final IAccountServices accountServices;
    private final IFirebaseServices firebaseServices;

    public ChatServicesImpl(
            MessageRepository messageRepository,
            ConversationRepository conversationRepository,
            IAccountServices accountServices,
            IFirebaseServices firebaseServices) {
        this.messageRepository = messageRepository;
        this.conversationRepository = conversationRepository;
        this.accountServices = accountServices;
        this.firebaseServices = firebaseServices;
    }

    @Override
    public UUID sendMessage(String token, SendMessageRequest request) {
        Account account = accountServices.findAccountByToken(token);

        if (account.getStaff() != null) {
            if (request.getConversationId() == null)
                throw new BadRequestException("Conversation ID is required for staff", 10016);

            Optional<Conversation> optionalConversation = conversationRepository
                    .findByConversationId(request.getConversationId());
            if (optionalConversation.isEmpty())
                throw new BadRequestException("Conversation not found", 10017);

            Conversation conversation = optionalConversation.get();
            if (conversation.getSupportAgent() == null || !conversation.getSupportAgent().getStaffId().equals(account.getStaff().getStaffId()))
                throw new BadRequestException("Conversation not found", 10017);

            return sendAndNotify(conversation, request, true);
        }
        else {
            // User doesn't need to provide conversation ID
            // Find the conversation with state WAITING_FOR_SUPPORT OR IN_PROGRESS
            Conversation conversation;
            Optional<Conversation> optionalConversation = conversationRepository
                    .findByAccountAndState(account, ConversationState.WAITING_FOR_AGENT)
                    .or(() -> conversationRepository.findByAccountAndState(account, ConversationState.IN_PROGRESS));

            if (optionalConversation.isEmpty())
            {
                // Create a new conversation
                conversation = new Conversation();
                conversation.setAccount(account);
                conversation.setState(ConversationState.WAITING_FOR_AGENT);
                conversationRepository.save(conversation);
            }
            else
                conversation = optionalConversation.get();

            return sendAndNotify(conversation, request, false);
        }
    }

    @Override
    public UUID acceptConversation(String token, UUID conversationId) {
        Account account = accountServices.findAccountByToken(token);

        Optional<Conversation> optionalConversation = conversationRepository.findByConversationId(conversationId);
        if (optionalConversation.isEmpty())
            throw new BadRequestException("Conversation not found", 10017);

        Conversation conversation = optionalConversation.get();
        if (conversation.getSupportAgent() != null)
            throw new BadRequestException("Conversation already accepted", 10018);

        conversation.setSupportAgent((SupportAgent) account.getStaff());
        conversation.setState(ConversationState.IN_PROGRESS);
        conversationRepository.save(conversation);

        return conversation.getConversationId();
    }

    @Override
    public MessagesResponse getMessages(String token, String conversationId, int sequenceNumber, String direction) {
        Account account = accountServices.findAccountByToken(token);

        Conversation conversation;
        if (account.getStaff() != null)
        {
            if (conversationId == null)
                throw new BadRequestException("Conversation ID is required for staff", 10016);

            Optional<Conversation> optionalConversation = conversationRepository
                    .findByConversationId(UUID.fromString(conversationId));
            if (optionalConversation.isEmpty())
                throw new BadRequestException("Conversation not found", 10017);

            conversation = optionalConversation.get();
            if (conversation.getSupportAgent() == null || !conversation.getSupportAgent().getStaffId().equals(account.getStaff().getStaffId()))
                throw new BadRequestException("Conversation not found", 10017);
        }
        else
        {
            Optional<Conversation> optionalConversation = conversationRepository
                    .findByAccountAndState(account, ConversationState.WAITING_FOR_AGENT)
                    .or(() -> conversationRepository.findByAccountAndState(account, ConversationState.IN_PROGRESS));

            if (optionalConversation.isEmpty())
                return MessagesResponse.builder()
                        .messages(null)
                        .conversation(null)
                        .build();

            conversation = optionalConversation.get();
        }

        Pageable pageable = PageRequest.of(0, 15);
        sequenceNumber = sequenceNumber == -1 ? conversation.getMaxSequenceNumber(): sequenceNumber;
        if (direction.equals("next"))
            return MessagesResponse.builder()
                    .messages(messageRepository
                            .getMessagesByConversationAndSequenceNumberGreaterThanOrderBySequenceNumber(
                                    conversation,
                                    sequenceNumber,
                                    pageable
                            ).getContent()
                    )
                    .conversation(conversation)
                    .build();
        else {
            List<Message> messages = messageRepository
                    .getMessagesByConversationAndSequenceNumberLessThanEqualOrderBySequenceNumberDesc(
                            conversation,
                            sequenceNumber,
                            pageable
                    ).getContent();

            return MessagesResponse.builder()
                    .messages(messages)
                    .conversation(conversation)
                    .build();
        }
    }

    @Override
    public List<ConversationResponse> getConversations(String token) {
        Account account = accountServices.findAccountByToken(token);

        List<Conversation> conversations = conversationRepository
                .findBySupportAgentAndState(
                        (SupportAgent) account.getStaff(),
                        ConversationState.IN_PROGRESS
                );

        return getConversationResponses(conversations);
    }

    @Override
    public List<ConversationResponse> getWaitingConversations() {
        List<Conversation> waitingConversation = conversationRepository
                .findBySupportAgentAndState(null, ConversationState.WAITING_FOR_AGENT);

        return getConversationResponses(waitingConversation);
    }

    @NotNull
    private List<ConversationResponse> getConversationResponses(List<Conversation> waitingConversation) {
        return waitingConversation.stream().map(conversation ->
        {
            List<Message> messages = messageRepository
                    .getMessagesByConversationAndSequenceNumberLessThanEqualOrderBySequenceNumberDesc(
                            conversation,
                            conversation.getMaxSequenceNumber(),
                            PageRequest.of(0, 1)
                    ).getContent();
            Message lastMessage = messages.isEmpty() ? null : messages.get(0);

            return ConversationResponse.builder()
                    .conversationId(conversation.getConversationId())
                    .userName(conversation.getAccount().getFullName())
                    .userId(conversation.getAccount().getUserId())
                    .lastMessage(lastMessage == null ? "" : lastMessage.getMessage())
                    .lastMessageDate(lastMessage == null ? null : lastMessage.getCreatedAt())
                    .lastMessageIsMine(lastMessage == null || lastMessage.isSupportAgent())
                    .build();
        }).toList();
    }

    private UUID sendAndNotify(Conversation conversation, SendMessageRequest request, boolean isStaff) {
        // Create and save the message
        Message message = new Message();
        message.setConversation(conversation);
        message.setMessage(request.getMessage());
        message.setSupportAgent(isStaff);
        message.setSequenceNumber(conversation.getMaxSequenceNumber() + 1);
        messageRepository.save(message);

        // Update the conversation
        conversation.setMaxSequenceNumber(message.getSequenceNumber());
        conversationRepository.save(conversation);

        // Notify the other party
        Map<String, String> data = Map.of(
                "title", "Tin nhắn mới",
                "body", request.getMessage(),
                "action", "chat",
                "value", "",
                "channelId", "chat"
        );
        if (isStaff)
            firebaseServices.sendNotificationToAccount(
                    conversation.getAccount(),
                    data
            );
        return conversation.getConversationId();
    }
}
