package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.*;
import com.theduckhospital.api.dto.request.RefundDataRequest;
import com.theduckhospital.api.dto.request.chat.MessagesResponse;
import com.theduckhospital.api.dto.request.chat.SendMessageRequest;
import com.theduckhospital.api.dto.response.CheckBookingRefundResponse;
import com.theduckhospital.api.dto.response.chat.ConversationResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.repository.*;
import com.theduckhospital.api.services.IAccountServices;
import com.theduckhospital.api.services.IBookingServices;
import com.theduckhospital.api.services.IChatServices;
import com.theduckhospital.api.services.IFirebaseServices;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ChatServicesImpl implements IChatServices {
    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final BookingRepository bookingRepository;
    private final TransactionRepository transactionRepository;
    private final NotificationRepository notificationRepository;

    private final IAccountServices accountServices;
    private final IFirebaseServices firebaseServices;

    public ChatServicesImpl(
            MessageRepository messageRepository,
            ConversationRepository conversationRepository,
            BookingRepository bookingRepository,
            TransactionRepository transactionRepository,
            NotificationRepository notificationRepository,
            IAccountServices accountServices,
            IFirebaseServices firebaseServices) {
        this.messageRepository = messageRepository;
        this.conversationRepository = conversationRepository;
        this.bookingRepository = bookingRepository;
        this.transactionRepository = transactionRepository;
        this.notificationRepository = notificationRepository;
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

        Optional<Conversation> optionalConversation = conversationRepository
                .findByConversationId(conversationId);
        if (optionalConversation.isEmpty())
            throw new BadRequestException("Conversation not found", 10017);

        Conversation conversation = optionalConversation.get();
        if (conversation.getSupportAgent() != null || conversation.getState() != ConversationState.WAITING_FOR_AGENT)
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
        if (conversation.getState() == ConversationState.CLOSED)
            throw new BadRequestException("Conversation is closed", 10019);

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

    @Override
    public boolean closeConversation(String token, UUID conversationId) {
        Account account = accountServices.findAccountByToken(token);
        Conversation conversationToClose = getConversation(conversationId, account);
        if (conversationToClose.getState() == ConversationState.CLOSED)
            throw new BadRequestException("Conversation is already closed", 10019);

        conversationToClose.setState(ConversationState.CLOSED);
        conversationRepository.save(conversationToClose);
        return true;
    }

    @Override
    public CheckBookingRefundResponse checkRefundBooking(String token, UUID conversationId, String bookingCode) {
        Account account = accountServices.findAccountByToken(token);

        Conversation conversationToCheck = getConversation(conversationId, account);
        Booking bookingToCheck = checkBookingRefundable(bookingCode, conversationToCheck);

        DoctorSchedule doctorSchedule = bookingToCheck.getTimeSlot().getDoctorSchedule();
        Doctor doctor = doctorSchedule.getDoctor();
        MedicalService medicalService = doctorSchedule.getMedicalService();
        Department department = doctor.getDepartment();


        return CheckBookingRefundResponse.builder()
                .bookingDate(doctorSchedule.getDate())
                .bookingCode(bookingToCheck.getBookingCode())
                .refundAmount(medicalService.getPrice())
                .isRefundable(true)
                .departmentName(department.getDepartmentName())
                .patientName(bookingToCheck.getPatientProfile().getFullName())
                .doctorName(doctor.getFullName())
                .build();
    }

    @Override
    @Transactional
    public boolean refundBooking(String token, UUID conversationId, RefundDataRequest request) {
        try {
            Account account = accountServices.findAccountByToken(token);

            Conversation conversationToCheck = getConversation(conversationId, account);
            Account userAccount = conversationToCheck.getAccount();
            if (userAccount.getWalletLocked())
                throw new BadRequestException("User wallet is locked", 10013);

            Booking bookingToCheck = checkBookingRefundable(request.getBookingCode(), conversationToCheck);

            // Create a refund transaction
            Transaction refundTransaction = new Transaction();
            refundTransaction.setAmount(bookingToCheck.getTimeSlot().getDoctorSchedule().getMedicalService().getPrice());
            refundTransaction.setPaymentType(PaymentType.REFUND);
            refundTransaction.setAccount(userAccount);
            transactionRepository.save(refundTransaction);
            refundTransaction.setStatus(TransactionStatus.SUCCESS);
            transactionRepository.save(refundTransaction);

            bookingToCheck.setRefundedTransactionId(refundTransaction.getTransactionId());
            bookingToCheck.setRefundReason(request.getRefundReason());
            bookingToCheck.setRefundedConversationId(conversationId);
            bookingRepository.save(bookingToCheck);

            userAccount.setBalance(userAccount.getBalance().add(BigDecimal.valueOf(refundTransaction.getAmount())));
            accountServices.saveAccount(userAccount);

            DoctorSchedule doctorSchedule = bookingToCheck.getTimeSlot().getDoctorSchedule();
            Doctor doctor = doctorSchedule.getDoctor();
            MedicalService medicalService = doctorSchedule.getMedicalService();
            Department department = doctor.getDepartment();

            // Format date to dd/MM/yyyy
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
            String formattedDate = simpleDateFormat.format(doctorSchedule.getDate());
            String body = "Số tiền đặt khám khoa "
                    + department.getDepartmentName()
                    + " với bác sĩ " + doctor.getFullName()
                    + " vào ngày " + formattedDate
                    + " đã được hoàn lại vào tài khoản của bạn";
            Map<String, String> data = Map.of(
                    "title", "Hoàn tiền thành công",
                    "body", body,
                    "action", "refund",
                    "value", "",
                    "channelId", "chat"
            );
            UUID notificationId = UUID.randomUUID();
            Notification notification = new Notification();
            notification.setNotificationId(notificationId);
            notification.setTitle("Hoàn tiền thành công");
            notification.setContent(body);
            notification.setData(data.toString());
            notification.setAccount(userAccount);
            notification.setCreatedAt(new Date());
            notification.setLastModifiedAt(new Date());
            notification.setDeleted(false);
            notification.setState(NotificationState.NOT_RECEIVED);
            notificationRepository.save(notification);

            firebaseServices.sendNotificationToAccount(userAccount, data);
        } catch (BadRequestException e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new BadRequestException(e.getMessage(), e.getErrorCode());
        } catch (Exception ignored) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new BadRequestException("Refund failed", 400);
        }
        return false;
    }

    private Booking checkBookingRefundable(String bookingCode, Conversation conversationToCheck) {
        Optional<Booking> booking = bookingRepository.findByBookingCodeAndDeletedIsFalse(bookingCode);
        if (booking.isEmpty())
            throw new BadRequestException("Booking not found", 10020);

        Booking bookingToCheck = booking.get();
        DoctorSchedule doctorSchedule = bookingToCheck.getTimeSlot().getDoctorSchedule();

        if (bookingToCheck.getRefundedTransactionId() != null)
            throw new BadRequestException("Booking is already refunded", 10021);
        if (bookingToCheck.getPatientProfile().getAccount().getUserId() != conversationToCheck.getAccount().getUserId())
            throw new BadRequestException("Booking does not belong to this user", 10022);
        // Can't refund if the booking is before 7 days
        if (doctorSchedule.getDate().getTime() + 7 * 24 * 60 * 60 * 1000 < DateCommon.getToday().getTime())
            throw new BadRequestException("Can't refund booking after 7 days", 10023);

        return bookingToCheck;
    }

    private Conversation getConversation(UUID conversationId, Account staffAccount) {
        Optional<Conversation> conversation = conversationRepository.findByConversationId(conversationId);
        if (conversation.isEmpty())
            throw new BadRequestException("Conversation not found", 10017);
        if (staffAccount.getStaff() == null ||
                !conversation.get().getSupportAgent().getStaffId()
                        .equals(staffAccount.getStaff().getStaffId())
        )
            throw new BadRequestException("Conversation not found", 10017);

        return conversation.get();
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
                    .avatar(conversation.getAccount().getAvatar())
                    .userId(conversation.getAccount().getUserId())
                    .lastMessage(lastMessage == null ? "" : lastMessage.getMessage())
                    .lastMessageDate(lastMessage == null ? null : lastMessage.getCreatedAt())
                    .lastMessageIsMine(lastMessage == null || lastMessage.isSupportAgent())
                    .build();
        }).toList();
    }

    private UUID sendAndNotify(Conversation conversation, SendMessageRequest request, boolean isStaff) {
        if (conversation.getState() == ConversationState.CLOSED)
            throw new BadRequestException("Conversation is closed", 10019);

        // Create and save the message
        Message message = new Message();
        message.setConversation(conversation);
        message.setMessage(request.getMessage().trim());
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
