package com.theduckhospital.api.services;

import com.theduckhospital.api.constant.PaymentMethod;
import com.theduckhospital.api.constant.PaymentType;
import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.dto.response.admin.FilteredTransactionsResponse;
import com.theduckhospital.api.dto.response.admin.TransactionResponse;
import com.theduckhospital.api.entity.Transaction;

import java.util.List;
import java.util.UUID;

public interface ITransactionServices {
    Transaction getTransactionById(String token, UUID transactionId);
    FilteredTransactionsResponse getFilteredTransactionsPagination(
            int page,
            int limit,
            List<String> transactionPayment,
            List<TransactionStatus> transactionStatus,
            List<PaymentType> paymentTypes
    );
    TransactionResponse getTransactionByIdAdmin(UUID transactionId);
}
