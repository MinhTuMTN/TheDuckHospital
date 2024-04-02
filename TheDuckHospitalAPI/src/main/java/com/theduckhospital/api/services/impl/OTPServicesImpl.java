package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.PatientProfile;
import com.theduckhospital.api.entity.TemporaryUser;
import com.theduckhospital.api.repository.AccountRepository;
import com.theduckhospital.api.repository.PatientProfileRepository;
import com.theduckhospital.api.repository.TemporaryUserRepository;
import com.theduckhospital.api.services.IOTPServices;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;

@Service
public class OTPServicesImpl implements IOTPServices {
    private final AccountRepository accountRepository;
    private final TemporaryUserRepository temporaryUserRepository;
    private final PatientProfileRepository patientProfileRepository;

    public OTPServicesImpl(AccountRepository accountRepository,
                           TemporaryUserRepository temporaryUserRepository, PatientProfileRepository patientProfileRepository) {
        this.accountRepository = accountRepository;
        this.temporaryUserRepository = temporaryUserRepository;
        this.patientProfileRepository = patientProfileRepository;
    }

    @Override
    public int generateOTP(Account account) {
        if (account == null)
            throw new IllegalArgumentException("Account is null");

        // If account already has OTP which is created less than 5 minutes ago
        if (account.getOtpCreatedAt() != null && account.getOtpCreatedAt().after(new Date(System.currentTimeMillis() - 5 * 60 * 1000))) {
            return account.getOtp();
        }

        // Random OTP 6 digits
        int otp = (int) (Math.random() * 900000) + 100000;
//        int otp = 123456;

        account.setOtp(otp);
        account.setOtpCount(0);
        account.setOtpCreatedAt(new Date());

        // Expired after 5 minutes
        account.setOtpExpiredAt(new Date(System.currentTimeMillis() + 5 * 60 * 1000));

        accountRepository.save(account);
        return otp;
    }

    @Override
    public int generateOTP(TemporaryUser temporaryUser) {
        if (temporaryUser == null)
            throw new IllegalArgumentException("Temporary user is null");

        // Random OTP 6 digits
        int otp = (int) (Math.random() * 900000) + 100001;

        temporaryUser.setOtp(otp);
        temporaryUser.setOtpCount(0);
        temporaryUser.setOtpCreatedAt(new Date());

        // Expired after 5 minutes
        temporaryUser.setOtpExpiredAt(new Date(System.currentTimeMillis() + 5 * 60 * 1000));

        temporaryUserRepository.save(temporaryUser);
        return otp;
    }

    @Override
    public int generateOTP(PatientProfile patientProfile) {
        if (patientProfile == null)
            throw new IllegalArgumentException("Temporary user is null");

        // Random OTP 6 digits
        int otp = (int) (Math.random() * 900000) + 100001;

        patientProfile.setOtp(String.valueOf(otp));
        patientProfile.setOtpCount(0);
        patientProfile.setOtpCreatedAt(new Date());
        patientProfile.setOtpExpiredAt(new Date(System.currentTimeMillis() + 5 * 60 * 1000));

        patientProfileRepository.save(patientProfile);
        return otp;
    }

    @Override
    public boolean verifyOTP(Account account, int otp) {
        if (account == null)
            throw new IllegalArgumentException("Account is null");

        if (account.getOtpCreatedAt() == null)
            return false;

        if (account.getOtpExpiredAt() == null || account.getOtpExpiredAt().before(new Date()))
            return false;

        if (account.getOtpCount() >= 5)
            return false;

        if (account.getOtp() != otp) {
            account.setOtpCount(account.getOtpCount() + 1);
            accountRepository.save(account);
            return false;
        }

        // OTP is correct
        account.setOtp(0);
        account.setOtpCount(0);
        account.setOtpCreatedAt(null);
        account.setOtpExpiredAt(null);
        accountRepository.save(account);
        return true;
    }

    @Override
    public boolean verifyOTP(TemporaryUser temporaryUser, int otp) {
        if (temporaryUser == null)
            throw new IllegalArgumentException("Account is null");

        if (temporaryUser.getOtpCreatedAt() == null)
            return false;

        if (temporaryUser.getOtpExpiredAt() == null || temporaryUser.getOtpExpiredAt().before(new Date()))
            return false;

        if (temporaryUser.getOtpCount() >= 5)
            return false;

        if (temporaryUser.getOtp() != otp) {
            temporaryUser.setOtpCount(temporaryUser.getOtpCount() + 1);
            temporaryUserRepository.save(temporaryUser);
            return false;
        }

        // OTP is correct
        temporaryUser.setOtp(0);
        temporaryUser.setOtpCount(0);
        temporaryUser.setOtpCreatedAt(null);
        temporaryUser.setOtpExpiredAt(null);
        temporaryUserRepository.save(temporaryUser);
        return true;
    }

    @Override
    public boolean verifyOTP(PatientProfile patientProfile, String otp) {
        if (patientProfile == null)
            throw new IllegalArgumentException("Account is null");

        if (patientProfile.getOtpCreatedAt() == null)
            return false;

        if (patientProfile.getOtpExpiredAt() == null || patientProfile.getOtpExpiredAt().before(new Date()))
            return false;

        if (patientProfile.getOtpCount() != null && patientProfile.getOtpCount() >= 5)
            return false;

        if (!Objects.equals(patientProfile.getOtp(), otp)) {
            int count = patientProfile.getOtpCount() == null ? 0 : patientProfile.getOtpCount();
            patientProfile.setOtpCount(count  + 1);
            patientProfileRepository.save(patientProfile);
            return false;
        }

        // OTP is correct
        patientProfile.setOtp("");
        patientProfile.setOtpCount(0);
        patientProfile.setOtpCreatedAt(null);
        patientProfile.setOtpExpiredAt(null);
        patientProfileRepository.save(patientProfile);
        return true;
    }
}
