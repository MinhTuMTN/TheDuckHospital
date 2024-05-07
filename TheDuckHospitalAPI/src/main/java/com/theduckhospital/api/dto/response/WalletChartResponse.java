package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.constant.PaymentType;
import lombok.Data;

@Data
public class WalletChartResponse {
    private PaymentType paymentType;
    private int value = 0;

    public WalletChartResponse(PaymentType paymentType, int value) {
        this.paymentType = paymentType;
        this.value = value;
    }
}
