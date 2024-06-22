package com.theduckhospital.api.controller.cashier;

import com.theduckhospital.api.dto.request.cashier.CashierPaymentRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.ICashierServices;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cashiers/payments")
@PreAuthorize("hasAnyRole('ROLE_CASHIER')")
public class CashierPaymentController {
    private final ICashierServices cashierServices;

    public CashierPaymentController(ICashierServices cashierServices) {
        this.cashierServices = cashierServices;
    }

    @GetMapping("/{paymentCode}")
    public ResponseEntity<?> getPaymentDetails(
            @PathVariable String paymentCode
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Get payment details successfully")
                .data(cashierServices.getPaymentDetails(paymentCode))
                .build());
    }

    @PostMapping
    public ResponseEntity<?> createPayment(
            @RequestHeader("Authorization") String authorization,
            @RequestBody @Valid CashierPaymentRequest cashierPaymentRequest,
            @RequestHeader("origin") String origin
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Create payment successfully")
                .data(cashierServices.createPayment(authorization, cashierPaymentRequest, origin))
                .build());
    }
}
