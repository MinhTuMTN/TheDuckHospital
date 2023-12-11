package com.theduckhospital.api.services;

import com.theduckhospital.api.entity.Transaction;

import java.util.UUID;

public interface ITransactionServices {
    Transaction getTransactionById(String token, UUID transactionId);
}
