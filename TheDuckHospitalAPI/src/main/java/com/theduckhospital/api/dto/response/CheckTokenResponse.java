package com.theduckhospital.api.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class CheckTokenResponse {
    private boolean valid;
    private String role;
    private String fullName;
    private BigDecimal balance;
}
