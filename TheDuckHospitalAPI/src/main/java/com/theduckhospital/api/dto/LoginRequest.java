package com.theduckhospital.api.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String emailOrPhoneNumber;
    private String password;
}
