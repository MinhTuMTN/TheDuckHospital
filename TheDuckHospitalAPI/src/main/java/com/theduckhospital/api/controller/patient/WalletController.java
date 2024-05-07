package com.theduckhospital.api.controller.patient;

import com.theduckhospital.api.dto.request.CheckWalletCodeRequest;
import com.theduckhospital.api.dto.request.OpenWalletRequest;
import com.theduckhospital.api.dto.request.TopUpWalletRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IWalletServices;
import jakarta.servlet.http.HttpServletRequest;
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
            @RequestBody @Valid TopUpWalletRequest topUpWalletRequest,
            HttpServletRequest request
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Create payment url to top up wallet successfully")
                .data(walletServices.topUpWallet(
                        authorization,
                        topUpWalletRequest,
                        request.getHeader("origin")
                ))
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

    @PostMapping("/check-wallet-code")
    public ResponseEntity<?> checkWalletCode(
            @RequestHeader("Authorization") String authorization,
            @RequestBody CheckWalletCodeRequest checkWalletCodeRequest
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Check wallet code successfully")
                .data(walletServices
                        .checkWalletCode(
                                authorization,
                                checkWalletCodeRequest.getPinCode()
                        )
                )
                .build()
        );
    }

    @GetMapping("/wallet-info")
    public ResponseEntity<?> getWalletInfo(
            @RequestHeader("Authorization") String authorization
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Get wallet info successfully")
                .data(walletServices.getWalletInfo(authorization))
                .build()
        );
    }

    @GetMapping("/statistic")
    public ResponseEntity<?> getWalletStatistic(
            @RequestHeader("Authorization") String authorization,
            @RequestParam(name = "month") int month,
            @RequestParam(name = "year") int year
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Get wallet statistic successfully")
                .data(walletServices.getWalletStatistic(authorization, month, year))
                .build()
        );
    }
}
