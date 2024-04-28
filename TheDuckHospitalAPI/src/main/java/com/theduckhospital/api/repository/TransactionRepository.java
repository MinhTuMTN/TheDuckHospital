package com.theduckhospital.api.repository;

import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    Page<Transaction> findByPaymentMethodInAndStatusInAndBookingsIsNotEmptyOrderByCreatedAtDesc(
            List<String> transactionPayment,
            List<TransactionStatus> transactionStatus,
            Pageable pageable
    );
    List<Transaction> findByPaymentMethodInAndStatusInAndBookingsIsNotEmpty(
            List<String> transactionPayment,
            List<TransactionStatus> transactionStatus
    );
    long countByPaymentMethod(String paymentMethod);
    List<Transaction> findByCreatedAtBetween(Date startDate, Date endDate);
    Page<Transaction> findByCreatedAtBetweenAndAccountAndStatusOrderByCreatedAtDesc(
            Date startDate,
            Date endDate,
            Account account,
            TransactionStatus status,
            Pageable pageable
    );
    List<Transaction> findByCreatedAtBetweenAndAccountAndStatusOrderByCreatedAtDesc(
            Date startDate,
            Date endDate,
            Account account,
            TransactionStatus status
    );
    @Query("SELECT SUM(t.amount) " +
            "FROM Transaction t " +
            "WHERE t.createdAt BETWEEN ?1 AND ?2 " +
            "AND t.account = ?3 AND t.status = ?4")
    double sumAmountByCreatedAtBetweenAndAccount(
            Date startDate,
            Date endDate,
            Account account,
            TransactionStatus status
    );
}
