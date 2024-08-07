package com.theduckhospital.api.dto.request;

import com.theduckhospital.api.constant.PaymentMethod;
import lombok.Data;

@Data
public class TopUpWalletRequest {
    private String pinCode;
    private double amount;
    private PaymentMethod paymentMethod;
}
