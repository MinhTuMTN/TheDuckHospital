package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.OpenWalletRequest;
import com.theduckhospital.api.dto.request.TopUpWalletRequest;
import com.theduckhospital.api.dto.response.PaymentResponse;
import com.theduckhospital.api.dto.response.WalletInfoResponse;
import com.theduckhospital.api.dto.response.WalletStatisticResponse;
import com.theduckhospital.api.entity.Account;

public interface IWalletServices {
    PaymentResponse topUpWallet(String authorization, TopUpWalletRequest request, String origin);
    boolean openWallet(String authorization, OpenWalletRequest request);
    boolean checkWalletCode(String authorization, String code);
    boolean checkWalletCode(Account account, String code);
    WalletInfoResponse getWalletInfo(String authorization);
    WalletStatisticResponse getWalletStatistic(String authorization, int month, int year);
}
