package com.theduckhospital.api.dto.request;

import lombok.Data;

@Data
public class UpdateDeviceInfoRequest {
    private String deviceId;
    private String deviceName;
    private String systemName;
    private String systemVersion;
    private String fcmToken;
}
