package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.dto.request.admin.CreateStaffRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IStaffServices;
import com.theduckhospital.api.services.ITransactionServices;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/transactions")
//@PreAuthorize("hasRole('ROLE_ADMIN')")
public class TransactionAdminController {
    private final ITransactionServices transactionServices;

    public TransactionAdminController(ITransactionServices transactionServices) {
        this.transactionServices = transactionServices;
    }

    @GetMapping("/filter")
    public ResponseEntity<?> getAllTransactionsPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int limit
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get transactions pagination successfully")
                        .data(transactionServices.getTransactionsPagination(page, limit))
                        .build()
        );
    }

//    @GetMapping("/{staffId}")
//    public  ResponseEntity<?> getStaffById(@PathVariable UUID staffId) {
//        return ResponseEntity.ok(
//                GeneralResponse.builder()
//                        .success(true)
//                        .message("Get staff by id successfully")
//                        .data(staffServices.getStaffById(staffId))
//                        .build()
//        );
//    }
}
