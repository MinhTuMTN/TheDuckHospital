package com.theduckhospital.api.dto.response.admin;

import lombok.Data;

import java.util.List;

@Data
public class FilteredTransactionsResponse {
    private List<TransactionResponse> transactions;
    private int total;
    private int page;
    private int limit;

    public FilteredTransactionsResponse(List<TransactionResponse> transactions, int total, int page, int limit) {
        this.transactions = transactions;
        this.total = total;
        this.page = page;
        this.limit = limit;
    }
}
