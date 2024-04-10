package com.theduckhospital.api.controller.patient;

import com.theduckhospital.api.dto.request.OpenWalletRequest;
import com.theduckhospital.api.dto.request.TopUpWalletRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IWalletServices;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wallet")
@PreAuthorize("hasRole('ROLE_USER')")
public class WalletController {
    private final IWalletServices walletServices;

    public WalletController(IWalletServices walletServices) {
        this.walletServices = walletServices;
    }

    @PostMapping("/top-up")
    public ResponseEntity<?> topUpWallet(
            @RequestHeader("Authorization") String authorization,
            @RequestBody @Valid TopUpWalletRequest topUpWalletRequest
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Create payment url to top up wallet successfully")
                .data(walletServices.topUpWallet(authorization, topUpWalletRequest))
                .build()
        );
    }

    @PostMapping("/open-wallet")
    public ResponseEntity<?> openWallet(
            @RequestHeader("Authorization") String authorization,
            @RequestBody @Valid OpenWalletRequest openWalletRequest
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Create payment url to top up wallet successfully")
                .data(walletServices.openWallet(authorization, openWalletRequest))
                .build()
        );
    }
}
