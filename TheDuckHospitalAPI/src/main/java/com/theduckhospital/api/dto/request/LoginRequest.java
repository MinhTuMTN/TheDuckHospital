package com.theduckhospital.api.dto.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String emailOrPhoneNumber;
    private String passwordOrOTP;
}
