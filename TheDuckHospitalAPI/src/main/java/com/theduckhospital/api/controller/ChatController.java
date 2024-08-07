package com.theduckhospital.api.controller;

import com.theduckhospital.api.dto.request.RefundDataRequest;
import com.theduckhospital.api.dto.request.chat.AcceptConversationRequest;
import com.theduckhospital.api.dto.request.chat.SendMessageRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IChatServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/chat")
@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_SUPPORT_AGENT')")
public class ChatController {
    private final IChatServices chatServices;

    public ChatController(IChatServices chatServices) {
        this.chatServices = chatServices;
    }

    @PostMapping("/send-message")
    public ResponseEntity<?> sendMessage(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody SendMessageRequest request
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Message sent")
                        .data(chatServices.sendMessage(token, request))
                        .statusCode(200)
                        .build()
        );
    }

    @PostMapping("/accept-conversation")
    @PreAuthorize("hasRole('ROLE_SUPPORT_AGENT')")
    public ResponseEntity<?> acceptConversation(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody AcceptConversationRequest request
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Conversation accepted")
                        .data(chatServices.acceptConversation(token,
                                request.getConversationId())
                        )
                        .statusCode(200)
                        .build()
        );
    }

    @GetMapping("/messages")
    public ResponseEntity<?> getMessages(
            @RequestHeader(name = "Authorization") String token,
            @RequestParam(name = "conversationId", required = false) String conversationId,
            @RequestParam(name = "sequenceNumber", required = false, defaultValue = "-1") int sequenceNumber,
            @RequestParam(name = "direction", required = false, defaultValue = "next") String direction
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Messages retrieved")
                        .data(chatServices.getMessages(
                                token,
                                conversationId,
                                sequenceNumber,
                                direction
                        ))
                        .statusCode(200)
                        .build()
        );
    }

    @PreAuthorize("hasRole('ROLE_SUPPORT_AGENT')")
    @GetMapping("/conversations")
    public ResponseEntity<?> getConversations(
            @RequestHeader(name = "Authorization") String token
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Conversations retrieved")
                        .data(chatServices.getConversations(token))
                        .statusCode(200)
                        .build()
        );
    }

    @PreAuthorize("hasRole('ROLE_SUPPORT_AGENT')")
    @GetMapping("/waiting-conversations")
    public ResponseEntity<?> getWaitingConversations(
            @RequestHeader(name = "Authorization") String token
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Conversations retrieved")
                        .data(chatServices.getWaitingConversations())
                        .statusCode(200)
                        .build()
        );
    }

    @PreAuthorize("hasRole('ROLE_SUPPORT_AGENT')")
    @DeleteMapping("/{conversationId}")
    public ResponseEntity<?> getWaitingConversations(
            @RequestHeader(name = "Authorization") String token,
            @PathVariable UUID conversationId
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Conversations retrieved")
                        .data(chatServices.closeConversation(token, conversationId))
                        .statusCode(200)
                        .build()
        );
    }

    @PreAuthorize("hasRole('ROLE_SUPPORT_AGENT')")
    @GetMapping("/{conversationId}/refund/check-booking/{bookingCode}")
    public ResponseEntity<?> getWaitingConversations(
            @RequestHeader(name = "Authorization") String token,
            @PathVariable UUID conversationId,
            @PathVariable String bookingCode
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Conversations retrieved")
                        .data(chatServices.checkRefundBooking(token, conversationId, bookingCode))
                        .statusCode(200)
                        .build()
        );
    }

    @PreAuthorize("hasRole('ROLE_SUPPORT_AGENT')")
    @PostMapping("/{conversationId}/refund")
    public ResponseEntity<?> refundBooking(
            @RequestHeader(name = "Authorization") String token,
            @PathVariable UUID conversationId,
            @RequestBody RefundDataRequest request
            ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Conversations retrieved")
                        .data(chatServices.refundBooking(token, conversationId, request))
                        .statusCode(200)
                        .build()
        );
    }
}
