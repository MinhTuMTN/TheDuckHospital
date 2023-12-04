package com.theduckhospital.api.services;

public interface IMSGraphServices {
    String createMSGraphUser(String fullName, String email, String password);
    boolean sendEmail(String recipient, String subject, String content);
}
