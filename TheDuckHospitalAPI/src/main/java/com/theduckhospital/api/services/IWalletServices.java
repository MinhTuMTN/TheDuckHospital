package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.OpenWalletRequest;
import com.theduckhospital.api.dto.request.TopUpWalletRequest;
import com.theduckhospital.api.dto.response.PaymentResponse;

public interface IWalletServices {
    PaymentResponse topUpWallet(String authorization, TopUpWalletRequest request);
    boolean openWallet(String authorization, OpenWalletRequest request);
}
