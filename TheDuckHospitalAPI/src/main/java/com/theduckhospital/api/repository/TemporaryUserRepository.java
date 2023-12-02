package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.TemporaryUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface TemporaryUserRepository extends JpaRepository<TemporaryUser, UUID> {
    Optional<TemporaryUser> findTemporaryUserByPhoneNumber(String phoneNumber);
}
