package com.theduckhospital.api.services.impl;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Device;
import com.theduckhospital.api.services.IFirebaseServices;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class FirebaseServicesImpl implements IFirebaseServices {
    private final FirebaseMessaging firebaseMessaging;

    public FirebaseServicesImpl(FirebaseMessaging firebaseMessaging) {
        this.firebaseMessaging = firebaseMessaging;
    }

    @Override
    public void sendNotification(String token, Map<String, String> data)
            throws FirebaseMessagingException {
        Message message = Message.builder()
                .setToken(token)
                .setNotification(
                        com.google.firebase.messaging.Notification.builder()
                                .build()
                )
                .putAllData(data)
                .build();

        firebaseMessaging.send(message);
    }

    @Override
    public void sendNotification(String token, String title, String body, Map<String, String> data)
            throws FirebaseMessagingException {
        Message message = Message.builder()
                .setToken(token)
                .setNotification(com.google.firebase.messaging.Notification.builder()
                        .setTitle(title)
                        .setBody(body)
                        .build())
                .putAllData(data)
                .build();

        String response = firebaseMessaging.send(message);

    }

    @Override
    public void sendNotificationToAccount(Account account, Map<String, String> data) {
        List<Device> devices = account.getDevices();
        for (Device device : devices) {
            if (device.getFcmToken() == null || device.getFcmToken().isEmpty())
                continue;
            try {
                sendNotification(device.getFcmToken(), data);
            } catch (FirebaseMessagingException ignored) {
                // If the device is not available,
                // we will ignore it and continue to send to the next device
            }
        }
    }
}
