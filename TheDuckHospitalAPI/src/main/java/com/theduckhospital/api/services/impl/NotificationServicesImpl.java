package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.NotificationState;
import com.theduckhospital.api.dto.response.PaginationResponse;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Notification;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.repository.NotificationRepository;
import com.theduckhospital.api.services.IAccountServices;
import com.theduckhospital.api.services.INotificationServices;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class NotificationServicesImpl implements INotificationServices {
    private final IAccountServices accountServices;
    private final NotificationRepository notificationRepository;

    public NotificationServicesImpl(IAccountServices accountServices, NotificationRepository notificationRepository) {
        this.accountServices = accountServices;
        this.notificationRepository = notificationRepository;
    }

    @Override
    public void updateNotificationState(String authorization, UUID notificationId, NotificationState state) {
        Account account = accountServices.findAccountByToken(authorization);
        Optional<Notification> notificationOptional = notificationRepository
                .findByNotificationIdAndAccount(notificationId, account);
        if (notificationOptional.isEmpty()) {
            throw new BadRequestException("Notification not found", 10009);
        }

        Notification notification = notificationOptional.get();
        notification.setState(state);

        if (state == NotificationState.DELETED) {
            notification.setDeleted(true);
        }
        notificationRepository.save(notification);
    }

    @Override
    public PaginationResponse getNotifications(String authorization, int page, int limit) {
        Account account = accountServices.findAccountByToken(authorization);
        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<Notification> notifications = notificationRepository.findByAccountAndDeletedIsFalseOrderByCreatedAtDesc(account, pageable);
        return PaginationResponse.builder()
                .limit(limit)
                .page(page)
                .totalItems((int) notifications.getTotalElements())
                .items(notifications.getContent())
                .build();
    }
}
