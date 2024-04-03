package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.entity.Device;
import lombok.Data;

import java.util.Date;

@Data
public class DeviceResponse {
    private String deviceId;
    private String deviceName;
    private String systemName;
    private String systemVersion;
    private String jwtTokenId;
    private Date lastAccessedAt;
    private Date firstAccessedAt;
    private boolean isThisDevice;

    public DeviceResponse(Device device, boolean isThisDevice) {
        this.deviceId = device.getDeviceId();
        this.deviceName = device.getDeviceName();
        this.systemName = device.getSystemName();
        this.systemVersion = device.getSystemVersion();
        this.jwtTokenId = device.getJwtTokenId();
        this.lastAccessedAt = device.getLastAccessedAt();
        this.firstAccessedAt = device.getFirstAccessedAt();
        this.isThisDevice = isThisDevice;
    }
}
