package com.theduckhospital.api.dto.request;

import lombok.Data;

@Data
public class ForgetPasswordRequest {
    private String phoneNumber;
}
