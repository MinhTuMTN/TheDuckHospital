package com.theduckhospital.api.dto.request.cashier;

import com.theduckhospital.api.constant.PaymentMethod;
import com.theduckhospital.api.constant.PaymentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CashierPaymentRequest {
    @NotBlank(message = "Payment code is required")
    private String paymentCode;
    @NotNull(message = "Payment type is required")
    private PaymentMethod paymentMethod;
}
