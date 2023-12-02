package com.theduckhospital.api.dto.request;

import lombok.Getter;

@Getter
public class CheckAccountExistRequest {
    public String emailOrPhoneNumber;
}
