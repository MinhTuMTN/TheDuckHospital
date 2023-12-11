package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Transaction;
import com.theduckhospital.api.repository.TransactionRepository;
import com.theduckhospital.api.services.IAccountServices;
import com.theduckhospital.api.services.ITransactionServices;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TransactionServicesImpl implements ITransactionServices {
    private final IAccountServices accountServices;
    private final TransactionRepository transactionRepository;

    public TransactionServicesImpl(IAccountServices accountServices, TransactionRepository transactionRepository) {
        this.accountServices = accountServices;
        this.transactionRepository = transactionRepository;
    }

    @Override
    public Transaction getTransactionById(String token, UUID transactionId) {
        Account account = accountServices.findAccountByToken(token);
        if (account == null)
            return null;

        Transaction transaction = transactionRepository.findById(transactionId).orElse(null);
        if (transaction == null)
            return null;

        if (!transaction.getBookings().get(0).getPatientProfile().getAccount().equals(account))
            return null;

        return transaction;
    }
}
