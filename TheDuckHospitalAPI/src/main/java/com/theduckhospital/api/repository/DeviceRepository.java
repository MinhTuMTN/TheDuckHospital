package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<Device, String> {
    Optional<Device> findByDeviceIdAndJwtTokenId(String deviceId, String jwtTokenId);
    Optional<Device> findByJwtTokenId(String jwtTokenId);
    List<Device> findDevicesByAccountAndDeletedIsFalse(Account account);
    Optional<Device> findByAccountAndJwtTokenId(Account account, String jwtTokenId);
    @Query("SELECT d FROM Device d WHERE d.account = ?1 AND d.jwtTokenId != ?2")
    List<Device> findOtherDevices(Account account, String jwtTokenId);
}
