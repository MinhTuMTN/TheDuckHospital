package com.theduckhospital.api.dto.response.admin;

import lombok.Data;

@Data
public class PieChartItemResponse {
    private int id;
    private long value;
    private String label;

    public PieChartItemResponse(int id, long value, String label) {
        this.id = id;
        this.value = value;
        this.label = label;
    }
}
