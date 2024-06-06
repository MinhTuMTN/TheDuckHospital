package com.theduckhospital.api.controller.cashier;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.ICashierServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
