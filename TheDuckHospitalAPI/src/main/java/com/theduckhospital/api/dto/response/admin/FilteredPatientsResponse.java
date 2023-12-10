package com.theduckhospital.api.dto.response.admin;

import lombok.Data;

import java.util.List;

@Data
public class FilteredPatientsResponse {
    private List<PatientResponse> patients;
    private int total;
    private int page;
    private int limit;

    public FilteredPatientsResponse(List<PatientResponse> patients, int total, int page, int limit) {
        this.patients = patients;
        this.total = total;
        this.page = page;
        this.limit = limit;
    }
}
