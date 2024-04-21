package com.theduckhospital.api.dto.request;

import lombok.Data;

@Data
public class CheckWalletCodeRequest {
    private String pinCode;
}
