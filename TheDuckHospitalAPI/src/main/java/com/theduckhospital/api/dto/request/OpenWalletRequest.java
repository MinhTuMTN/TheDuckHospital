package com.theduckhospital.api.dto.request;

import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class OpenWalletRequest {
    @Pattern(regexp = "^[0-9]{6}$", message = "Pin code must be 6 digits")
    private String pinCode;
    @Pattern(regexp = "^[0-9]{6}$", message = "Re-pin code must be 6 digits")
    private String rePinCode;
}
