package com.theduckhospital.api.services;

import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.TemporaryUser;

public interface IOTPServices {
    int generateOTP(Account account);
    int generateOTP(TemporaryUser temporaryUser);
    boolean verifyOTP(Account account, int otp);
    boolean verifyOTP(TemporaryUser temporaryUser, int otp);
}
