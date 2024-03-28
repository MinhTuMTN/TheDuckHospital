package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.dto.request.UpdateDeviceInfoRequest;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Device;
import com.theduckhospital.api.repository.DeviceRepository;
import com.theduckhospital.api.security.JwtTokenProvider;
import com.theduckhospital.api.services.IDeviceServices;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class DeviceServicesImpl implements IDeviceServices {
    private final DeviceRepository deviceRepository;
    private final JwtTokenProvider tokenProvider;

    public DeviceServicesImpl(DeviceRepository deviceRepository, JwtTokenProvider tokenProvider) {
        this.deviceRepository = deviceRepository;
        this.tokenProvider = tokenProvider;
    }

    @Override
    public boolean updateDeviceInfo(UpdateDeviceInfoRequest request, Account account, String jwtTokenId) {
        Optional<Device> optionalDevice = deviceRepository.findByDeviceIdAndJwtTokenId(request.getDeviceId(), jwtTokenId);

        Device device;
        if (optionalDevice.isEmpty()) {
            Optional<Device> optionalDeviceByJwtTokenId = deviceRepository.findByJwtTokenId(jwtTokenId);
            if (optionalDeviceByJwtTokenId.isEmpty())
                return false;

            device = optionalDeviceByJwtTokenId.get();
            device.setDeviceId(request.getDeviceId());
        } else
            device = optionalDevice.get();

        device.setAccount(account);
        device.setDeviceName(request.getDeviceName());
        device.setSystemName(request.getSystemName());
        device.setSystemVersion(request.getSystemVersion());
        device.setFcmToken(request.getFcmToken());
        device.setLastAccessedAt(new Date());

        deviceRepository.save(device);
        return true;
    }

    @Override
    public boolean saveDeviceJwtToken(String jwtTokenId, Account account) {
        Device device = new Device();
        device.setJwtTokenId(jwtTokenId);
        device.setAccount(account);
        device.setFirstAccessedAt(new Date());
        device.setLastAccessedAt(new Date());

        deviceRepository.save(device);
        return true;
    }

    @Override
    public boolean checkAuthorizationDevice(String tokenId) {
        Optional<Device> optionalDevice = deviceRepository.findByJwtTokenId(tokenId);

        return optionalDevice.isPresent() && !optionalDevice.get().isDeleted();
    }

    @Override
    public boolean deleteDeviceJwtToken(String tokenId) {
        Optional<Device> optionalDevice = deviceRepository.findByJwtTokenId(tokenId);

        if (optionalDevice.isEmpty())
            return false;

        Device device = optionalDevice.get();
        deviceRepository.delete(device);
        return true;
    }
}
