package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.UpdateDeviceInfoRequest;
import com.theduckhospital.api.dto.response.DeviceResponse;
import com.theduckhospital.api.entity.Account;

import java.util.List;

public interface IDeviceServices {

    boolean updateDeviceInfo(UpdateDeviceInfoRequest request, Account account, String jwtTokenId);
    boolean saveDeviceJwtToken(String jwtTokenId, Account account);
    boolean checkAuthorizationDevice(String tokenId);
    boolean deleteDeviceJwtToken(String tokenId);
    List<DeviceResponse> getDevicesByAccount(Account account, String jwtTokenId);
    boolean remoteLogout(Account account, String logoutTokenId);
    boolean remoteLogoutAll(Account account, String jwtTokenId);
}
