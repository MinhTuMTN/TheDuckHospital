package com.theduckhospital.api.dto.request;

import lombok.Data;

@Data
public class ForgetPasswordDataRequest {
    private String otp;
    private String phoneNumber;
    private String newPassword;
    private String confirmNewPassword;
}
