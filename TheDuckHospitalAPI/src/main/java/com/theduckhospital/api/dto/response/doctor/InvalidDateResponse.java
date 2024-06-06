package com.theduckhospital.api.dto.response.doctor;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class InvalidDateResponse {
    List<Date> mornings;
    List<Date> afternoons;
    List<Date> evenings;
    List<Date> nights;

    public InvalidDateResponse(List<Date> mornings, List<Date> afternoons, List<Date> evenings, List<Date> nights) {
        this.mornings = mornings;
        this.afternoons = afternoons;
        this.evenings = evenings;
        this.nights = nights;
    }
}
