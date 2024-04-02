package com.theduckhospital.api.controller.patient;

import com.theduckhospital.api.constant.NotificationState;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.INotificationServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/notifications")
@PreAuthorize("hasRole('ROLE_USER')")
public class NotificationController {
    private final INotificationServices notificationServices;

    public NotificationController(INotificationServices notificationServices) {
        this.notificationServices = notificationServices;
    }

    @GetMapping("/update-state")
    public ResponseEntity<?> updateNotificationState(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("notificationId") UUID notificationId,
            @RequestParam("state") NotificationState state
    ) {
        notificationServices.updateNotificationState(authorization, notificationId, state);
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Update notification state successfully")
                        .data(true)
                        .statusCode(200)
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<?> getNotifications(
            @RequestHeader("Authorization") String authorization,
            @RequestParam(name = "page", required = false, defaultValue = "1") int page,
            @RequestParam(name = "limit", required = false, defaultValue = "10") int limit
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get all notifications successfully")
                        .data(notificationServices.getNotifications(authorization, page, limit))
                        .build()
        );
    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<?> deleteNotification(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("notificationId") UUID notificationId
    ) {
        notificationServices.updateNotificationState(authorization, notificationId, NotificationState.DELETED);
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Delete notification successfully")
                        .data(true)
                        .statusCode(200)
                        .build()
        );
    }
}
