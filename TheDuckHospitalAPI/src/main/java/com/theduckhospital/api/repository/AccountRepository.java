package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Account;
import jakarta.validation.constraints.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID> {
    Account findUserByEmail(String email);
    Account findUserByPhoneNumber(String phoneNumber);
    Account findAccountByPhoneNumberAndDeletedIsFalse(String phoneNumber);
    Account findAccountByEmailAndDeletedIsFalse(String email);
}
