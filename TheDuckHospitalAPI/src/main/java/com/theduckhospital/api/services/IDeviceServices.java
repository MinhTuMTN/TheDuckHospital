package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.UpdateDeviceInfoRequest;
import com.theduckhospital.api.entity.Account;

public interface IDeviceServices {

    boolean updateDeviceInfo(UpdateDeviceInfoRequest request, Account account, String jwtTokenId);
    boolean saveDeviceJwtToken(String jwtTokenId, Account account);
    boolean checkAuthorizationDevice(String tokenId);
    boolean deleteDeviceJwtToken(String tokenId);
}
