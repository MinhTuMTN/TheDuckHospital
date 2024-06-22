package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.cashier.CashierPaymentRequest;
import com.theduckhospital.api.dto.response.PaymentResponse;
import com.theduckhospital.api.dto.response.cashier.BillDetailsResponse;
import com.theduckhospital.api.entity.Cashier;

public interface ICashierServices {
    BillDetailsResponse getPaymentDetails(String paymentCode);
    PaymentResponse createPayment(String token, CashierPaymentRequest request, String origin);
    Cashier findCashierByToken(String token);
}
