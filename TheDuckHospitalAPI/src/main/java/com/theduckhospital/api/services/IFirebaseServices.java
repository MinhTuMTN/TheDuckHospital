package com.theduckhospital.api.services;

import com.google.firebase.messaging.FirebaseMessagingException;

import java.util.Map;

public interface IFirebaseServices {
    boolean sendNotification(String token, String title, String body) throws FirebaseMessagingException;
    boolean sendNotification(String token, String title, String body, Map<String, String> data) throws FirebaseMessagingException;
}
