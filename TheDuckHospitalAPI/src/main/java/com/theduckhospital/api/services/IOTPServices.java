package com.theduckhospital.api.services;

import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.PatientProfile;
import com.theduckhospital.api.entity.TemporaryUser;

public interface IOTPServices {
    int generateOTP(Account account);
    int generateOTP(TemporaryUser temporaryUser);
    int generateOTP(PatientProfile patientProfile);
    boolean verifyOTP(Account account, int otp);
    boolean verifyOTP(TemporaryUser temporaryUser, int otp);
    boolean verifyOTP(PatientProfile patientProfile, String otp);
}
