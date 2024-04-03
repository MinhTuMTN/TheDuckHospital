package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {
    Page<Notification> findByAccountAndDeletedIsFalseOrderByCreatedAtDesc(Account account, Pageable pageable);
    Optional<Notification> findByNotificationIdAndAccount(UUID notificationId, Account account);
}
