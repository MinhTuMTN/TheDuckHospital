package com.theduckhospital.api.services;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.theduckhospital.api.dto.request.RegisterRequest;
import com.theduckhospital.api.dto.response.CheckTokenResponse;
import com.theduckhospital.api.entity.Account;

public interface IAccountServices {
    Account findAccount(String emailOrPhone);
    boolean loginWithPassword(String emailOrPhone, String password);
    boolean loginWithOtp(String emailOrPhone, String otp);
    boolean checkAccountExistAndSendOtp(String emailOrPhone) throws FirebaseMessagingException;
    Account register(RegisterRequest request);
    boolean sendOTP(String emailOrPhone) throws FirebaseMessagingException;
    CheckTokenResponse checkToken(String token);
    Account findAccountByToken(String token);
    String checkInfo(String token);
}
