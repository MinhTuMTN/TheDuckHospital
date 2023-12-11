package com.theduckhospital.api.services;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

public interface IVNPayServices {
    String createPaymentUrl(double amount, UUID transactionId)  throws UnsupportedEncodingException;
}
