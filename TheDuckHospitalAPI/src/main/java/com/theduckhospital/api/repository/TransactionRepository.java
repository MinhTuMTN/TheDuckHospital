package com.theduckhospital.api.repository;

import com.theduckhospital.api.constant.PaymentMethod;
import com.theduckhospital.api.constant.PaymentType;
import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Transaction;
import jakarta.persistence.Enumerated;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

//    @Query(value = "SELECT * FROM transactions " +
//            "WHERE status IN :transactionStatus " +
//            "AND (paymentMethod IN :transactionPayment " +
//            "OR paymentMethod == null) " +
//            "ORDER BY createdAt DESC",
//            nativeQuery = true
//    )
//    Page<Transaction> findFilteredTransactionsHasCashMethod(
//            @Param("transactionPayment") List<PaymentMethod> transactionPayment,
//            @Param("transactionStatus") List<TransactionStatus> transactionStatus,
//            Pageable pageable
//    );

    @Query(value = "SELECT * FROM transactions " +
            "WHERE status IN (:transactionStatus) " +
            "AND (payment_method IN (:transactionPayment) " +
            "OR payment_method IS NULL) " +
            "ORDER BY created_at DESC", nativeQuery = true)
    Page<Transaction> findFilteredTransactionsHasCashMethod(
           @Param("transactionPayment") List<String> transactionPayment,
            @Param("transactionStatus") List<TransactionStatus> transactionStatus,
            Pageable pageable);

    List<Transaction> findByPaymentMethodInAndStatusInAndBookingsIsNotEmpty(
            List<String> transactionPayment,
            List<TransactionStatus> transactionStatus
    );

    long countByPaymentMethod(String paymentMethod);

    List<Transaction> findByCreatedAtBetweenAndPaymentTypeInAndStatus(
            Date startDate,
            Date endDate,
            List<PaymentType> paymentTypes,
            TransactionStatus status
    );

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
    Double sumAmountByCreatedAtBetweenAndAccount(
            Date startDate,
            Date endDate,
            Account account,
            TransactionStatus status
    );

//    List<Transaction> findByStatusAndHospitalAdmissionIsNotNullAndCreatedAtBetween(
//            TransactionStatus status,
//            Date startDate,
//            Date endDate
//    );

    List<Transaction> findByStatusAndHospitalAdmissionIsNotNullAndHospitalAdmission_Department_DepartmentIdAndCreatedAtBetweenOrderByCreatedAtAsc(
            TransactionStatus status,
            int departmentId,
            Date startDate,
            Date endDate
    );
}
