package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.dto.request.OpenWalletRequest;
import com.theduckhospital.api.dto.request.TopUpWalletRequest;
import com.theduckhospital.api.dto.response.PaymentResponse;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.services.IAccountServices;
import com.theduckhospital.api.services.IWalletServices;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class WalletServicesImpl implements IWalletServices {
    private final IAccountServices accountServices;
    private final PasswordEncoder passwordEncoder;

    public WalletServicesImpl(IAccountServices accountServices, PasswordEncoder passwordEncoder) {
        this.accountServices = accountServices;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public PaymentResponse topUpWallet(String authorization, TopUpWalletRequest request) {
        Account account = accountServices.findAccountByToken(authorization);
        return null;
    }

    @Override
    public boolean openWallet(String authorization, OpenWalletRequest request) {
        if (!request.getPinCode().equals(request.getRePinCode()))
            throw new BadRequestException("Pin code and re-pin code must be the same", 10112);

        Account account = accountServices.findAccountByToken(authorization);

        if (!account.isWalletLocked())
            throw new BadRequestException("Wallet is already opened", 10113);
        
        account.setWalletPin(passwordEncoder.encode(request.getPinCode()));
        account.setBalance(BigDecimal.ZERO);
        account.setWalletLocked(false);
        accountServices.saveAccount(account);

        return true;
    }
}
