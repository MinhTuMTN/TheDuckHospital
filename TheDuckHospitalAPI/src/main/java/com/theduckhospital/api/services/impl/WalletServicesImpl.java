package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.MomoConfig;
import com.theduckhospital.api.constant.PaymentType;
import com.theduckhospital.api.dto.request.OpenWalletRequest;
import com.theduckhospital.api.dto.request.TopUpWalletRequest;
import com.theduckhospital.api.dto.response.PaymentResponse;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Transaction;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.repository.TransactionRepository;
import com.theduckhospital.api.services.IAccountServices;
import com.theduckhospital.api.services.IPaymentServices;
import com.theduckhospital.api.services.IWalletServices;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;

@Service
public class WalletServicesImpl implements IWalletServices {
    private final IAccountServices accountServices;
    private final IPaymentServices paymentServices;
    private final PasswordEncoder passwordEncoder;
    private final TransactionRepository transactionRepository;

    public WalletServicesImpl(IAccountServices accountServices, IPaymentServices paymentServices, PasswordEncoder passwordEncoder, TransactionRepository transactionRepository) {
        this.accountServices = accountServices;
        this.paymentServices = paymentServices;
        this.passwordEncoder = passwordEncoder;
        this.transactionRepository = transactionRepository;
    }

    @Override
    @Transactional
    public PaymentResponse topUpWallet(String authorization, TopUpWalletRequest request, String origin) {
        try {
            Account account = accountServices.findAccountByToken(authorization);

            // Check wallet is available and pin code is correct
            if (!checkWalletCode(account, request.getPinCode()))
                throw new BadRequestException("Pin code isn't correct", 10014);

            // Check amount is positive
            if (request.getAmount() <= 0)
                throw new BadRequestException("Amount must be positive", 10115);

            int totalAmount = (int) (request.getAmount() + MomoConfig.medicalTestFee);
            Transaction transaction = new Transaction();
            transaction.setAccount(account);
            transaction.setAmount(totalAmount);
            transaction.setOrigin(origin);
            transaction.setPaymentType(PaymentType.TOP_UP);
            transactionRepository.save(transaction);

            return switch (request.getPaymentMethod()) {
                case VNPAY -> {
                    try {
                        yield paymentServices.vnPayCreatePaymentUrl(
                                totalAmount,
                                transaction.getTransactionId()
                        );
                    } catch (UnsupportedEncodingException e) {
                        throw new BadRequestException("Error when create payment url");
                    }
                }
                case MOMO -> {
                    try {
                        yield paymentServices.momoCreatePaymentUrl(
                                totalAmount,
                                transaction.getTransactionId(),
                                true
                        );
                    } catch (IOException e) {
                        throw new BadRequestException("Error when create payment url");
                    }
                }
                default -> throw new BadRequestException("Invalid payment method");
            };
        } catch (BadRequestException e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new BadRequestException(e.getMessage(), e.getErrorCode() == 0 ? 400 : e.getErrorCode());
        } catch (Exception e) {
            e.printStackTrace();
            throw new BadRequestException("Error when pay medical test", 400);
        }
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

    @Override
    public boolean checkWalletCode(String authorization, String code) {
        Account account = accountServices.findAccountByToken(authorization);

        return checkWalletCode(account, code);
    }

    @Override
    public boolean checkWalletCode(Account account, String code) {
        if (account.isWalletLocked()) {
            throw new BadRequestException("Wallet is locked", 10113);
        }

        if (!passwordEncoder.matches(code, account.getWalletPin())) {
            account.setWalletPinCount((byte) (account.getWalletPinCount() + 1));

            if (account.getWalletPinCount() >= 3) {
                account.setWalletLocked(true);
            }

            accountServices.saveAccount(account);
            return false;
        }

        account.setWalletPinCount((byte) 0);
        accountServices.saveAccount(account);
        return true;
    }
}
