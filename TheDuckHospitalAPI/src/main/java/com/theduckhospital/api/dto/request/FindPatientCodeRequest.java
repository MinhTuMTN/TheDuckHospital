package com.theduckhospital.api.dto.request;

import com.theduckhospital.api.constant.Gender;
import lombok.Data;

@Data
public class FindPatientCodeRequest {
    private String fullName;
    private int yearOfBirth;
    private int provinceId;
    private Gender gender;
}
