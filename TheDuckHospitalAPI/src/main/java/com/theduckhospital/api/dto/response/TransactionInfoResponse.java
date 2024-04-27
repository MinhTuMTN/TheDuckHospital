package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.constant.PaymentMethod;
import com.theduckhospital.api.constant.PaymentType;
import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.entity.Transaction;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class TransactionInfoResponse {
    private UUID transactionId;
    private double amount;
    private PaymentType paymentType;
    private String paymentMethod;
    private TransactionStatus status;
    private Date createdAt;

    public TransactionInfoResponse(Transaction transaction) {
        this.transactionId = transaction.getTransactionId();
        this.amount = transaction.getAmount();
        this.paymentType = transaction.getPaymentType();
        this.status = transaction.getStatus();
        this.createdAt = transaction.getCreatedAt();
        this.paymentMethod = transaction.getPaymentMethod();
    }
}
