package com.theduckhospital.api.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PaginationResponse {
    private int totalPages;
    private int totalItems;
    private int page;
    private int limit;
    private List<?> items;
}
