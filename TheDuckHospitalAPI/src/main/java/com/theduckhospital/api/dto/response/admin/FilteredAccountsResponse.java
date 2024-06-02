package com.theduckhospital.api.dto.response.admin;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FilteredAccountsResponse {
    private List<AccountResponse> accounts;
    private int total;
    private int page;
    private int limit;

    public FilteredAccountsResponse(List<AccountResponse> accounts, int total, int page, int limit) {
        this.accounts = accounts;
        this.total = total;
        this.page = page;
        this.limit = limit;
    }
}
