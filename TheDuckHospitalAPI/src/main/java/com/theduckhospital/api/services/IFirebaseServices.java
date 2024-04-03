package com.theduckhospital.api.services;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.theduckhospital.api.entity.Account;

import java.util.Map;

public interface IFirebaseServices {
    void sendNotification(String token, Map<String, String> data) throws FirebaseMessagingException;
    void sendNotification(String token, String title, String body, Map<String, String> data) throws FirebaseMessagingException;
    void sendNotificationToAccount(Account account, Map<String, String> data);
}
