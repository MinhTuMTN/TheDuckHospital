package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.response.cashier.BillDetailsResponse;

public interface ICashierServices {
    BillDetailsResponse getPaymentDetails(String paymentCode);
}
