package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.response.PaymentResponse;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.UUID;

public interface IPaymentServices {
    PaymentResponse vnPayCreatePaymentUrl(double amount, UUID transactionId) throws UnsupportedEncodingException;
    PaymentResponse momoCreatePaymentUrl(double amount, UUID transactionId) throws IOException;
}
