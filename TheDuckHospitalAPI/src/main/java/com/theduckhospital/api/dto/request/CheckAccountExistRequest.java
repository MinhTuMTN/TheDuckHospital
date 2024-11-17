package com.theduckhospital.api.dto.request;

import jakarta.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class CheckAccountExistRequest {
    @Pattern(regexp = "^(0\\d{9}|.*@.*)$", message = "Invalid email or phone number")
    public String emailOrPhoneNumber;
}
