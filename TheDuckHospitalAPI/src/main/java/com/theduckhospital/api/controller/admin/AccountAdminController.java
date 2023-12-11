package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.dto.request.admin.CreateStaffRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IAccountServices;
import com.theduckhospital.api.services.IStaffServices;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/accounts")
//@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AccountAdminController {
    private final IAccountServices accountServices;

    public AccountAdminController(IAccountServices accountServices) {
        this.accountServices = accountServices;
    }

    @GetMapping("/filter")
    public ResponseEntity<?> getAllAccountsPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int limit
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get accounts pagination successfully")
                        .data(accountServices.getPaginationAccounts(page, limit))
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
}
