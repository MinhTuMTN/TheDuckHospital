package com.theduckhospital.api.controller;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.theduckhospital.api.dto.CheckAccountExistRequest;
import com.theduckhospital.api.dto.GeneralResponse;
import com.theduckhospital.api.dto.LoginRequest;
import com.theduckhospital.api.dto.RegisterRequest;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.security.CustomUserDetails;
import com.theduckhospital.api.security.JwtTokenProvider;
import com.theduckhospital.api.services.IAccountServices;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
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
        if (!accountServices.checkAccountExistAndSendOtp(request.getEmailOrPhoneNumber()))
            return ResponseEntity.status(401).body(GeneralResponse.builder()
                    .success(false)
                    .message("Account not exist")
                    .build());

        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Account exist. OTP sent")
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
}
