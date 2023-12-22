package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.ITransactionServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/transactions")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class TransactionAdminController {
    private final ITransactionServices transactionServices;

    public TransactionAdminController(ITransactionServices transactionServices) {
        this.transactionServices = transactionServices;
    }

    @GetMapping("/filtered")
    public ResponseEntity<?> getAllTransactionsPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int limit,
            @RequestParam(defaultValue = "VNPay, Cash") List<String> transactionPayment,
            @RequestParam(defaultValue = "PENDING, SUCCESS, FAILED") List<TransactionStatus> transactionStatus
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get filtered transactions pagination successfully")
                        .data(transactionServices
                                .getFilteredTransactionsPagination(
                                        page,
                                        limit,
                                        transactionPayment,
                                        transactionStatus
                                )).build()
        );
    }

    @GetMapping("/{transactionId}")
    public  ResponseEntity<?> getTransactionByIdAdmin(@PathVariable UUID transactionId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get transaction by id successfully")
                        .data(transactionServices.getTransactionByIdAdmin(transactionId))
                        .build()
        );
    }
}
