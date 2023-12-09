package com.theduckhospital.api.error;

import lombok.Getter;

@Getter
public class StatusCodeException extends RuntimeException{
    private final int statusCode;

    public StatusCodeException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
