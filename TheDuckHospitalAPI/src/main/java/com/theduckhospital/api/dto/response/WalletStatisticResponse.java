package com.theduckhospital.api.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class WalletStatisticResponse {
    private double balance;
    private int month;
    private int year;
    private List<WalletChartResponse> charts;
    private List<TransactionInfoResponse> transactions;
}
