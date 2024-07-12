package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Staff;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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

    @Query(
            value = "SELECT a.* FROM account a " +
                    "LEFT JOIN staff s ON a.staff_id = s.staff_id " +
                    "WHERE a.deleted IN ?2 " +
                    "AND a.full_name LIKE CONCAT('%', ?1, '%') " +
                    "AND (a.staff_id IS NULL OR s.dtype IN ?3)",
            countQuery = "SELECT COUNT(a.user_id) FROM account a " +
                    "LEFT JOIN staff s ON a.staff_id = s.staff_id " +
                    "WHERE a.deleted IN ?2 " +
                    "AND a.full_name LIKE CONCAT('%', ?1, '%') " +
                    "AND (a.staff_id IS NULL OR s.dtype IN ?3)",
            nativeQuery = true
    )
    Page<Account> findAccount(
            String fullName,
            List<Boolean> deleted,
            List<String> staffClasses,
            Pageable pageable
    );

//    @Query(
//            value = "SELECT a FROM Account a " +
//                    "LEFT JOIN Staff s ON a.staff.staffId = s.staffId " +
//                    "WHERE a.deleted IN :deleted " +
//                    "AND a.fullName LIKE %:fullName% " +
//                    "AND (a.staff_id IS NULL OR TYPE(a.staff) IN :staffClasses)",
//            countQuery = "SELECT COUNT(a.userId) FROM Account a " +
//                    "LEFT JOIN Staff s ON a.staff.staffId = s.staffId " +
//                    "WHERE a.deleted IN :deleted " +
//                    "AND a.fullName LIKE %:fullName% " +
//                    "AND (a.a.staff_id IS NULL OR TYPE(a.staff) IN :staffClasses)"
//    )
//    Page<Account> findAccount(
//            String fullName,
//            List<Boolean> deleted,
//            List<Class<? extends Staff>> staffClasses,
//            Pageable pageable
//    );

//    @Query(
//            value = "SELECT a.* FROM account a " +
//                    "LEFT JOIN staff s ON a.staff_id = s.staff_id " +
//                    "WHERE a.deleted IN ?2 " +
//                    "AND a.full_name LIKE CONCAT('%', ?1, '%') " +
//                    "AND s.dtype IN ?3",
//            countQuery = "SELECT COUNT(a.user_id) FROM account a " +
//                    "LEFT JOIN staff s ON a.staff_id = s.staff_id " +
//                    "WHERE a.deleted IN ?2 " +
//                    "AND a.full_name LIKE CONCAT('%', ?1, '%') " +
//                    "AND s.dtype IN ?3",
//            nativeQuery = true
//    )
//    Page<Account> findAccountWithoutPatient(
//            String fullName,
//            List<Boolean> deleted,
//            List<String> staffClasses,
//            Pageable pageable
//    );

    @Query(
            value = "SELECT a FROM Account a " +
                    "WHERE a.deleted IN :deleted " +
                    "AND a.fullName LIKE %:fullName% " +
                    "AND TYPE(a.staff) IN :staffClasses",
            countQuery = "SELECT COUNT(a.userId) FROM Account a " +
                    "WHERE a.deleted IN :deleted " +
                    "AND a.fullName LIKE %:fullName% " +
                    "AND TYPE(a.staff) IN :staffClasses"
    )
    Page<Account> findAccountWithoutPatient(
            String fullName,
            List<Boolean> deleted,
            List<Class<? extends Staff>> staffClasses,
            Pageable pageable
    );
}
