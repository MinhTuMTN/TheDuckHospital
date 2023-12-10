package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.entity.MedicalService;
import lombok.Data;

import java.util.List;

@Data
public class FilteredMedicalServicesResponse {
    private List<MedicalService> medicalServices;
    private int total;
    private int page;
    private int limit;

    public FilteredMedicalServicesResponse(List<MedicalService> medicalServices, int total, int page, int limit) {
        this.medicalServices = medicalServices;
        this.total = total;
        this.page = page;
        this.limit = limit;
    }
}
