package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID> {
    Account findUserByEmail(String email);
    Account findUserByPhoneNumber(String phoneNumber);
    Account findUserByPhoneNumberOrEmail(String phoneNumber, String email);
    Account findAccountByPhoneNumberAndDeletedIsFalse(String phoneNumber);
    Account findAccountByEmailAndDeletedIsFalse(String email);
    Account findAccountByUserIdAndDeletedIsFalse(UUID userId);
    Page<Account> findPaginationByOrderByDeleted(Pageable pageable);
    List<Account> findByFullNameContainingAndDeletedIn(String fullName, List<Boolean> deleted);
}
