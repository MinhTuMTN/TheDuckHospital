package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.entity.*;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class TransactionResponse {
    private UUID transactionId;
    private double amount;
    private String userName;
    private TransactionStatus status;
    private Date createdAt;
    private String paymentMethod;
    private String bankCode;
    private List<BookingResponse> bookings;

    public TransactionResponse(Transaction transaction, List<BookingResponse> bookings, String userName) {
        this.transactionId = transaction.getTransactionId();
        this.userName = userName;
        this.amount = transaction.getAmount();
        this.status = transaction.getStatus();
        this.createdAt = transaction.getCreatedAt();
        this.paymentMethod = transaction.getPaymentMethod();
        this.bankCode = transaction.getBankCode();
        this.bookings = bookings;
    }
}
