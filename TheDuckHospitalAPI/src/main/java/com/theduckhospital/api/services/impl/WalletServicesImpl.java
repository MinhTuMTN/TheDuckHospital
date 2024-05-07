package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.DateCommon;
import com.theduckhospital.api.constant.MomoConfig;
import com.theduckhospital.api.constant.PaymentType;
import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.dto.request.OpenWalletRequest;
import com.theduckhospital.api.dto.request.TopUpWalletRequest;
import com.theduckhospital.api.dto.response.*;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Transaction;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.repository.TransactionRepository;
import com.theduckhospital.api.services.IAccountServices;
import com.theduckhospital.api.services.IPaymentServices;
import com.theduckhospital.api.services.IWalletServices;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.*;

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

        if (!account.getWalletLocked())
            throw new BadRequestException("Wallet is already opened", 10113);
        
        account.setWalletPin(passwordEncoder.encode(request.getPinCode()));
        account.setBalance(BigDecimal.ZERO);
        account.setWalletLocked(false);
        account.setWalletCreatedAt(new Date());
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
        if (account.getWalletLocked()) {
            throw new BadRequestException("Wallet is locked", 10113);
        }

        if (!passwordEncoder.matches(code, account.getWalletPin())) {
            account.setWalletPinCount((account.getWalletPinCount() + 1));

            if (account.getWalletPinCount() >= 3) {
                account.setWalletLocked(true);
            }

            accountServices.saveAccount(account);
            return false;
        }

        account.setWalletPinCount(0);
        accountServices.saveAccount(account);
        return true;
    }

    @Override
    public WalletInfoResponse getWalletInfo(String authorization) {
        Account account = accountServices.findAccountByToken(authorization);

        Calendar today = DateCommon.getCalendar(DateCommon.getToday());
        List<Calendar> startEndDay = getStartEndDayOfMonth(
                today.get(Calendar.MONTH) + 1,
                today.get(Calendar.YEAR)
        );

        Calendar startDay = startEndDay.get(0);
        Calendar endDay = startEndDay.get(1);

        // Get total amount of transactions in this month
        Double totalThisMonth = transactionRepository
                .sumAmountByCreatedAtBetweenAndAccount(
                        startDay.getTime(),
                        endDay.getTime(),
                        account,
                        TransactionStatus.SUCCESS
                );

        // Last 5 transactions in this month
        Pageable pageable = PageRequest.of(0, 5);
        List<TransactionInfoResponse> last5Transactions = transactionRepository
                .findByCreatedAtBetweenAndAccountAndStatusOrderByCreatedAtDesc(
                        startDay.getTime(),
                        endDay.getTime(),
                        account,
                        TransactionStatus.SUCCESS,
                        pageable
                ).stream()
                .map(TransactionInfoResponse::new)
                .toList();


        return WalletInfoResponse.builder()
                .phoneNumber(account.getPhoneNumber())
                .fullName(account.getFullName())
                .walletCreatedAt(account.getWalletCreatedAt())
                .balance(account.getBalance().doubleValue())
                .totalThisMonth(totalThisMonth == null ? 0 : totalThisMonth)
                .transactions(last5Transactions)
                .build();
    }

    @Override
    public WalletStatisticResponse getWalletStatistic(String authorization, int month, int year) {
        List<Calendar> startEndDay = getStartEndDayOfMonth(month, year);
        Calendar startDay = startEndDay.get(0);
        Calendar endDay = startEndDay.get(1);

        List<Transaction> transactions = transactionRepository
                .findByCreatedAtBetweenAndAccountAndStatusOrderByCreatedAtDesc(
                        startDay.getTime(),
                        endDay.getTime(),
                        accountServices.findAccountByToken(authorization),
                        TransactionStatus.SUCCESS
                );

        Map<PaymentType, Integer> paymentTypeCount = new HashMap<>(Map.of(
                PaymentType.TOP_UP, 0,
                PaymentType.MEDICAL_TEST, 0,
                PaymentType.REFUND, 0,
                PaymentType.BOOKING, 0
        ));

        for (Transaction transaction : transactions)
            paymentTypeCount.put(
                    transaction.getPaymentType(),
                    paymentTypeCount.get(transaction.getPaymentType()) + 1
            );

        List<TransactionInfoResponse> transactionInfoResponses = transactions.stream()
                .map(TransactionInfoResponse::new)
                .toList();
        List<WalletChartResponse> walletChartResponses = paymentTypeCount.entrySet().stream()
                .map(entry -> new WalletChartResponse(entry.getKey(), entry.getValue()))
                .toList();

        return WalletStatisticResponse.builder()
                .balance(accountServices.findAccountByToken(authorization).getBalance().doubleValue())
                .month(month)
                .year(year)
                .charts(walletChartResponses)
                .transactions(transactionInfoResponses)
                .build();
    }

    private List<Calendar> getStartEndDayOfMonth(int month, int year) {
        Calendar startDay = DateCommon.getCalendar(DateCommon.getToday());
        startDay.set(Calendar.MONTH, month - 1);
        startDay.set(Calendar.YEAR, year);
        startDay.set(Calendar.DAY_OF_MONTH, 1);

        Calendar endDay = DateCommon.getCalendar(DateCommon.getToday());
        endDay.set(Calendar.MONTH, month - 1);
        endDay.set(Calendar.YEAR, year);
        endDay.set(Calendar.DAY_OF_MONTH, endDay.getActualMaximum(Calendar.DAY_OF_MONTH));
        endDay.set(Calendar.HOUR_OF_DAY, 23);
        endDay.set(Calendar.MINUTE, 59);
        endDay.set(Calendar.SECOND, 59);

        return List.of(startDay, endDay);
    }
}
