package com.theduckhospital.api.controller;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.theduckhospital.api.dto.request.CheckAccountExistRequest;
import com.theduckhospital.api.dto.request.GeneralResponse;
import com.theduckhospital.api.dto.request.LoginRequest;
import com.theduckhospital.api.dto.request.RegisterRequest;
import com.theduckhospital.api.dto.response.CheckTokenResponse;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.security.CustomUserDetails;
import com.theduckhospital.api.security.JwtTokenProvider;
import com.theduckhospital.api.services.IAccountServices;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Value("${security.secret.password}")
    private String secretPassword;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    private final IAccountServices accountServices;


    public AuthController(AuthenticationManager authenticationManager,
                          JwtTokenProvider jwtTokenProvider,
                          IAccountServices accountServices) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.accountServices = accountServices;
    }

    @PostMapping("/login-password")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        if (!accountServices.loginWithPassword(
                loginRequest.getEmailOrPhoneNumber(),
                loginRequest.getPasswordOrOTP()
        ))
            return ResponseEntity.status(401).body(GeneralResponse.builder()
                    .success(false)
                    .message("Login failed")
                    .build());

        return authenticate(loginRequest);
    }

    @PostMapping("/login-otp")
    public ResponseEntity<?> loginWithOtp(@RequestBody LoginRequest loginRequest) {
        if (!accountServices.loginWithOtp(
                loginRequest.getEmailOrPhoneNumber(),
                loginRequest.getPasswordOrOTP()
        ))
            return ResponseEntity.status(401).body(GeneralResponse.builder()
                    .success(false)
                    .message("Login failed")
                    .build());

        return authenticate(loginRequest);
    }

    private ResponseEntity<?> authenticate(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmailOrPhoneNumber(),
                        secretPassword
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(
                (CustomUserDetails) authentication.getPrincipal()
        );
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Login success")
                .data(token)
                .build()
        );
    }

    @PostMapping("/check-account-exist")
    public ResponseEntity<?> checkAccountExistAndSendOtp(@RequestBody CheckAccountExistRequest request)
            throws FirebaseMessagingException {
        if (accountServices.checkAccountExistAndSendOtp(request.getEmailOrPhoneNumber()))
            return ResponseEntity
                    .status(request.getEmailOrPhoneNumber().contains("@") ? 400 : 200)
                    .body(GeneralResponse.builder()
                    .success(true)
                    .message("Account not exist")
                    .data(false)
                    .build());

        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Account exist")
                .data(true)
                .build()
        );
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest request) {
        Account account = accountServices.register(request);
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Register success")
                .data(account)
                .build()
        );
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody CheckAccountExistRequest request)
            throws FirebaseMessagingException {
        if (accountServices.sendOTP(request.getEmailOrPhoneNumber()))
            return ResponseEntity.status(200).body(GeneralResponse.builder()
                    .success(true)
                    .message("Send OTP success")
                    .data(true)
                    .build());

        return ResponseEntity.status(404).body(GeneralResponse.builder()
                .success(true)
                .message("Send OTP failed")
                .data(false)
                .build());
    }

    @GetMapping("/check-token")
    public ResponseEntity<?> checkToken(
            @RequestHeader(name = "Authorization") String token
    ) {
        CheckTokenResponse response = accountServices.checkToken(token);
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(response.isValid())
                .message(response.isValid() ? "Token is valid" : "Token is invalid")
                .data(response)
                .build()
        );
    }
}
