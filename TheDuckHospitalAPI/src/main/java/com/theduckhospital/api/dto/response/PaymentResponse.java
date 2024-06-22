package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.constant.PaymentMethod;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentResponse {
    private String paymentUrl;
    private PaymentMethod paymentMethod;
    private String deepLink;
    private boolean walletSuccess;
    private boolean cashSuccess;
}
