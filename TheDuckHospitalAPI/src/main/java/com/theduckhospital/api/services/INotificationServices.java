package com.theduckhospital.api.services;

import com.theduckhospital.api.constant.NotificationState;
import com.theduckhospital.api.dto.response.PaginationResponse;

import java.util.UUID;

public interface INotificationServices {
    void updateNotificationState(String authorization, UUID notificationId, NotificationState state);
    PaginationResponse getNotifications(String authorization, int page, int limit);
}
