package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<Device, String> {
    Optional<Device> findByDeviceIdAndJwtTokenId(String deviceId, String jwtTokenId);
    Optional<Device> findByJwtTokenId(String jwtTokenId);
}
