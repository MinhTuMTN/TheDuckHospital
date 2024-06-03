package com.theduckhospital.api.controller.cashier;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cashiers/payments")
@PreAuthorize("hasAnyRole('ROLE_CASHIER')")
public class CashierPaymentController {
}
