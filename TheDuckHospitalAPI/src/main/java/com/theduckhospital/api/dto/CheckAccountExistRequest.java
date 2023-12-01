package com.theduckhospital.api.dto;

import lombok.Getter;

@Getter
public class CheckAccountExistRequest {
    public String emailOrPhoneNumber;
}
