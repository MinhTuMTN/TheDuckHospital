package com.theduckhospital.api.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class WalletInfoResponse {
    private String phoneNumber;
    private String fullName;
    private Date walletCreatedAt;
    private double balance;
    private double totalThisMonth;
    private List<TransactionInfoResponse> transactions;
}
