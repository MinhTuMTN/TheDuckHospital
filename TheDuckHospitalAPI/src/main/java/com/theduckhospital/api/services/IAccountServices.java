package com.theduckhospital.api.services;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.theduckhospital.api.constant.Role;
import com.theduckhospital.api.dto.request.RegisterRequest;
import com.theduckhospital.api.dto.response.CheckTokenResponse;
import com.theduckhospital.api.dto.response.admin.AccountResponse;
import com.theduckhospital.api.dto.response.admin.FilteredAccountsResponse;
import com.theduckhospital.api.entity.Account;

import java.util.List;
import java.util.UUID;
import java.util.Map;

public interface IAccountServices {
    Account findAccount(String emailOrPhone);
    boolean loginWithPassword(String emailOrPhone, String password);
    boolean loginWithOtp(String emailOrPhone, String otp);
    boolean checkAccountExistAndSendOtp(String emailOrPhone) throws FirebaseMessagingException;
    Account register(RegisterRequest request);
    boolean sendOTP(String emailOrPhone) throws FirebaseMessagingException;
    CheckTokenResponse checkToken(String token);
    Account findAccountByToken(String token);

    FilteredAccountsResponse getPaginationFilteredAccounts(
            String search,
            int page,
            int limit,
            List<Role> accountRole,
            List<Boolean> accountStatus
    );

    AccountResponse getAccountById(UUID userId);

    boolean deleteAccount(UUID userID);

    AccountResponse restoreAccount(UUID userId);
    Map<String, String> checkInfo(String token);
}
