package com.theduckhospital.api.services.impl;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.theduckhospital.api.services.IFirebaseServices;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class FirebaseServicesImpl implements IFirebaseServices {
    private final FirebaseMessaging firebaseMessaging;

    public FirebaseServicesImpl(FirebaseMessaging firebaseMessaging) {
        this.firebaseMessaging = firebaseMessaging;
    }

    @Override
    public boolean sendNotification(String token, String title, String body)
            throws FirebaseMessagingException {
        Message message = Message.builder()
                .setToken(token)
                .setNotification(com.google.firebase.messaging.Notification.builder()
                        .setTitle(title)
                        .setBody(body)
                        .build())
                .build();

        String response = firebaseMessaging.send(message);

        return response != null;
    }

    @Override
    public boolean sendNotification(String token, String title, String body, Map<String, String> data)
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

        return response != null;
    }
}
