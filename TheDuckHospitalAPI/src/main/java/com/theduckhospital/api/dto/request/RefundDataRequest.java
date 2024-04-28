package com.theduckhospital.api.dto.request;

import lombok.Data;

import java.util.UUID;

@Data
public class RefundDataRequest {
    private String bookingCode;
    private String refundReason;
}
