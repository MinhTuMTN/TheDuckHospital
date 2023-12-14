package com.theduckhospital.api.dto.response.admin;

import lombok.Data;

import java.util.List;

@Data
public class FilteredActiveDoctorsResponse {
    private List<ActiveDoctorResponse> doctors;
    private long total;
    private int page;
    private int limit;

    public FilteredActiveDoctorsResponse(List<ActiveDoctorResponse> doctors, long total, int page, int limit) {
        this.doctors = doctors;
        this.total = total;
        this.page = page;
        this.limit = limit;
    }
}
