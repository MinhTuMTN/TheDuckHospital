package com.theduckhospital.api.dto.response.doctor;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class InvalidDateResponse {
    List<Date> mornings;
    List<Date> afternoons;

    public InvalidDateResponse(List<Date> mornings, List<Date> afternoons) {
        this.mornings = mornings;
        this.afternoons = afternoons;
    }
}
