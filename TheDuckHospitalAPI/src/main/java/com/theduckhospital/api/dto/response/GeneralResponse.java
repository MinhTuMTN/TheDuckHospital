package com.theduckhospital.api.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GeneralResponse {
    private boolean success;
    private String message;
    private Object data;
    private int statusCode;
}
