package com.theduckhospital.api.controller.patient;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.entity.Transaction;
import com.theduckhospital.api.services.ITransactionServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
@PreAuthorize("hasRole('ROLE_USER')")
public class TransactionController {
    private final ITransactionServices transactionServices;

    public TransactionController(ITransactionServices transactionServices) {
        this.transactionServices = transactionServices;
    }

    @GetMapping("/{transactionId}")
    public ResponseEntity<?> getTransactionById(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("transactionId") UUID transactionId
    ) {
        Transaction transaction = transactionServices.getTransactionById(authorization, transactionId);
        if (transaction == null)
            return ResponseEntity.badRequest().body(
                    GeneralResponse.builder()
                            .success(false)
                            .message("Transaction not found")
                            .build()
            );

        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Get transaction successfully")
                .data(transactionServices.getTransactionById(authorization, transactionId))
                .build()
        );
    }
}
