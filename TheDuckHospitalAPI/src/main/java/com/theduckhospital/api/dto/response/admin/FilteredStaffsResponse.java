package com.theduckhospital.api.dto.response.admin;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FilteredStaffsResponse {
    private List<StaffResponse> staffs;
    private int total;
    private int page;
    private int limit;

    public FilteredStaffsResponse(List<StaffResponse> staffs, int total, int page, int limit) {
        this.staffs = staffs;
        this.total = total;
        this.page = page;
        this.limit = limit;
    }
}
