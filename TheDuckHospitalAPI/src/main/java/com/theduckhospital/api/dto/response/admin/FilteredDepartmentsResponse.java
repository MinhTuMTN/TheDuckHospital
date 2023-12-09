package com.theduckhospital.api.dto.response.admin;

import lombok.Data;

import java.util.List;

@Data
public class FilteredDepartmentsResponse {
    private List<DepartmentResponse> departments;
    private int total;
    private int page;
    private int limit;

    public FilteredDepartmentsResponse(
            List<DepartmentResponse> departments,
            int total,
            int page,
            int limit
    ) {
        this.departments = departments;
        this.total = total;
        this.page = page;
        this.limit = limit;
    }
}
