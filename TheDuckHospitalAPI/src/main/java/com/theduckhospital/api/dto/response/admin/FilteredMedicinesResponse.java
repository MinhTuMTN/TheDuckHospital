package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.entity.Medicine;
import lombok.Data;

import java.util.List;

@Data
public class FilteredMedicinesResponse {
    private List<Medicine> medicines;
    private long total;
    private int page;
    private int limit;

    public FilteredMedicinesResponse(List<Medicine> medicines, long total, int page, int limit) {
        this.medicines = medicines;
        this.total = total;
        this.page = page;
        this.limit = limit;
    }
}
