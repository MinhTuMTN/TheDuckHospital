package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.constant.Role;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IAccountServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/accounts")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AccountAdminController {
    private final IAccountServices accountServices;

    public AccountAdminController(IAccountServices accountServices) {
        this.accountServices = accountServices;
    }

    @GetMapping("/filtered")
    public ResponseEntity<?> getFilteredAccountsPagination(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int limit,
            @RequestParam(required = false) List<Role> accountRole,
            @RequestParam(defaultValue = "false, true") List<Boolean> accountStatus
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get filtered accounts pagination successfully")
                        .data(accountServices.getPaginationFilteredAccounts(search, page, limit, accountRole, accountStatus))
                        .build()
        );
    }

    @GetMapping("/{userId}")
    public  ResponseEntity<?> getAccountById(@PathVariable UUID userId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get account by id successfully")
                        .data(accountServices.getAccountById(userId))
                        .build()
        );
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteAccount(@PathVariable UUID userId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Delete account successfully")
                        .data(accountServices.deleteAccount(userId))
                        .build()
        );
    }

    @PutMapping("/{userId}/restore")
    public ResponseEntity<?> restoreAccount(@PathVariable UUID userId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Restore account successfully")
                        .data(accountServices.restoreAccount(userId))
                        .build()
        );
    }

    @GetMapping("/otp-test/{phone}")
    public ResponseEntity<?> otpTest(@PathVariable String phone) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("OTP test successfully")
                        .data(accountServices.otpTest(phone))
                        .build()
        );
    }
}
