package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID> {
    Account findUserByEmailAndPassword(String email, String password);
    Account findUserByEmail(String email);
    Account findUserByPhoneNumberAndPassword(String phoneNumber, String password);
    Account findUserByPhoneNumber(String phoneNumber);
}
