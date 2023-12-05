package com.theduckhospital.api.services;

import java.io.UnsupportedEncodingException;

public interface IVNPayServices {
    String createPaymentUrl(int amount)  throws UnsupportedEncodingException;
}
