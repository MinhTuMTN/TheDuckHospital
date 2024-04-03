package com.theduckhospital.api.error;

import lombok.Data;
import lombok.Getter;

@Getter
public class BadRequestException extends RuntimeException {
    private int errorCode;
    public BadRequestException(String message) {
        super(message);
    }
    public BadRequestException(String message, int errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
}
