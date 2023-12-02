package com.theduckhospital.api.services.impl;

import com.google.firebase.auth.hash.Bcrypt;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.theduckhospital.api.dto.RegisterRequest;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.TemporaryUser;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.repository.AccountRepository;
import com.theduckhospital.api.repository.TemporaryUserRepository;
import com.theduckhospital.api.services.IAccountServices;
import com.theduckhospital.api.services.IFirebaseServices;
import com.theduckhospital.api.services.IOTPServices;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AccountServicesImpl implements IAccountServices {
    @Value("${settings.fcm.token}")
    private String fcmToken;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final IOTPServices otpServices;
    private final IFirebaseServices firebaseServices;
    private final TemporaryUserRepository temporaryUserRepository;

    public AccountServicesImpl(AccountRepository accountRepository,
                               PasswordEncoder passwordEncoder,
                               IOTPServices otpServices,
                               IFirebaseServices firebaseServices,
                               TemporaryUserRepository temporaryUserRepository) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.otpServices = otpServices;
        this.firebaseServices = firebaseServices;
        this.temporaryUserRepository = temporaryUserRepository;
    }
    @Override
    public Account findAccount(String emailOrPhone) {
        if (emailOrPhone.contains("@")) {
            return accountRepository.findAccountByEmailAndDeletedIsFalse(emailOrPhone);
        } else {
            return accountRepository.findAccountByPhoneNumberAndDeletedIsFalse(emailOrPhone);
        }
    }

    @Override
    public boolean loginWithPassword(String emailOrPhone, String password) {
        Account account = findAccount(emailOrPhone);

        if (account == null) {
            return false;
        }

         return passwordEncoder.matches(password, account.getPassword());
    }

    @Override
    public boolean loginWithOtp(String emailOrPhone, String otp) {
        Account account = findAccount(emailOrPhone);

        if (account == null) {
            return false;
        }

        int otpNumber = 0;
        try {
            otpNumber = Integer.parseInt(otp);
        } catch (NumberFormatException e) {
            return false;
        }

        return otpServices.verifyOTP(account, otpNumber);
    }

    @Override
    public boolean checkAccountExistAndSendOtp(String emailOrPhone) throws FirebaseMessagingException {
        // Check if account already exist
        Account account = findAccount(emailOrPhone);

        int otp = 0;
        if (account == null && !emailOrPhone.contains("@")) {
            Optional<TemporaryUser> optionalTemporaryUser = temporaryUserRepository
                    .findTemporaryUserByPhoneNumber(emailOrPhone);

            optionalTemporaryUser.ifPresent(temporaryUserRepository::delete);

            TemporaryUser temporaryUser = new TemporaryUser();
            temporaryUser.setPhoneNumber(emailOrPhone);

            otp = otpServices.generateOTP(temporaryUser);
        }

        if (account != null) {
            otp = otpServices.generateOTP(account);
        }

        if (emailOrPhone.contains("@")) {
            // Not implement yet
            throw new UnsupportedOperationException();
        } else {
            Map<String, String> data = new HashMap<>();
            data.put("phoneNumber", emailOrPhone);
            data.put("message", "Your OTP is " + otp);
            firebaseServices.sendNotification(
                    fcmToken,
                    "OTP",
                    "Your OTP is " + otp,
                    data
            );
        }

        return account != null;
    }

    @Override
    public Account register(RegisterRequest request) {
        // Check if account already exist
        Account account = findAccount(request.getPhoneNumber());
        if (account != null) {
            throw new BadRequestException("Account already exist");
        }

        // Find temporary user to verify OTP
        TemporaryUser user = temporaryUserRepository.findTemporaryUserByPhoneNumber(request.getPhoneNumber())
                .orElseThrow(() -> new BadRequestException("Invalid request"));

        // Parse OTP to integer. If not valid, throw exception
        int otp = 0;
        try {
            otp = Integer.parseInt(request.getOtp());
        } catch (Exception e) {
            throw new BadRequestException("OTP is not valid");
        }

        // Verify OTP
        boolean isOtpCorrect = otpServices.verifyOTP(user, otp);
        if (!isOtpCorrect) {
            throw new BadRequestException("OTP is not correct");
        }

        // Delete temporary user
        temporaryUserRepository.delete(user);

        // Create new account
        account = new Account();
        account.setPhoneNumber(request.getPhoneNumber());
        account.setPassword(passwordEncoder.encode(request.getPassword()));
        account.setFullName(request.getFullName());
        account.setDeleted(false);

        // Save account to database
        return accountRepository.save(account);
    }
}
