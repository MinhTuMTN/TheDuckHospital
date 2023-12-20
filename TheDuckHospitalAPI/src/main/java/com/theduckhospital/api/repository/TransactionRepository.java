package com.theduckhospital.api.repository;

import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.entity.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
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
}
