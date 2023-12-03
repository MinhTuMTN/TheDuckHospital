package com.theduckhospital.api.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CheckTokenResponse {
    private boolean valid;
    private String role;
}
