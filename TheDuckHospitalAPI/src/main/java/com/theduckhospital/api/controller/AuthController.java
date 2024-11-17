package com.theduckhospital.api.controller;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.theduckhospital.api.dto.request.*;
import com.theduckhospital.api.dto.response.CheckTokenResponse;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.security.CustomUserDetails;
import com.theduckhospital.api.security.JwtTokenProvider;
import com.theduckhospital.api.services.IAccountServices;
import com.theduckhospital.api.services.IDeviceServices;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Value("${security.secret.password}")
    private String secretPassword;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    private final IAccountServices accountServices;
    private final IDeviceServices deviceServices;


    public AuthController(AuthenticationManager authenticationManager,
                          JwtTokenProvider jwtTokenProvider,
                            IDeviceServices deviceServices,
                          IAccountServices accountServices) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.accountServices = accountServices;
        this.deviceServices = deviceServices;
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
                    .statusCode(401)
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
                    .statusCode(401)
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
        Map<String, String> result = jwtTokenProvider.generateToken(
                (CustomUserDetails) authentication.getPrincipal()
        );
        boolean isSaveDeviceJwtToken = deviceServices.saveDeviceJwtToken(
                result.get("tokenId"),
                ((CustomUserDetails) authentication.getPrincipal()).getAccount()
        );
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Login success")
                .data(result.get("token"))
                .statusCode(200)
                .build()
        );
    }

    @PostMapping("/check-account-exist")
    public ResponseEntity<?> checkAccountExistAndSendOtp(@RequestBody @Valid CheckAccountExistRequest request)
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

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmailOrPhoneNumber(request.getPhoneNumber());
        loginRequest.setPasswordOrOTP(request.getPassword());
        return authenticate(loginRequest);
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
                .statusCode(response.isValid() ? 200 : 401)
                .data(response)
                .build()
        );
    }

    @GetMapping("/check-info")
    public ResponseEntity<?> checkInfo(
            @RequestHeader(name = "Authorization") String token
    ) {
        Map<String, String> data = accountServices.checkInfo(token);
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Get info success")
                .data(data)
                .statusCode(200)
                .build()
        );
    }

    @PostMapping("/forget-password")
    public ResponseEntity<?> sendOTPForgetPassword(@RequestBody ForgetPasswordRequest request) throws FirebaseMessagingException {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Send OTP success")
                .data(accountServices.sendOTPForgetPassword(request.getPhoneNumber()))
                .statusCode(200)
                .build()
        );
    }

    @PostMapping("/forget-password/verify-change-password")
    public ResponseEntity<?> verifyForgetPassword(@RequestBody ForgetPasswordDataRequest request) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Reset password success")
                .data(accountServices.verifyForgetPassword(request))
                .statusCode(200)
                .build()
        );
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody ChangePasswordRequest request
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Change password success")
                .data(accountServices.changePassword(token, request))
                .statusCode(200)
                .build()
        );
    }

    @PostMapping("/update-device-info")
    public ResponseEntity<?> updateDeviceInfo(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody UpdateDeviceInfoRequest request
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Update device info success")
                .data(accountServices.updateDeviceInfo(token, request))
                .statusCode(200)
                .build()
        );
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(
            @RequestHeader(name = "Authorization") String token
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Logout success")
                .data(accountServices.logout(token))
                .statusCode(200)
                .build()
        );
    }

    @GetMapping("/devices")
    public ResponseEntity<?> getDevices(
            @RequestHeader(name = "Authorization") String token
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Get devices success")
                .data(accountServices.getDevices(token))
                .statusCode(200)
                .build()
        );
    }

    @PostMapping("/remote-logout")
    public ResponseEntity<?> remoteLogout(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody RemoteLogoutRequest request
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Remote logout success")
                .data(accountServices.remoteLogout(request.getLogoutTokenId(), token))
                .statusCode(200)
                .build()
        );
    }

    @GetMapping("/remote-logout-all")
    public ResponseEntity<?> remoteLogoutAll(
            @RequestHeader(name = "Authorization") String token
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Remote logout all success")
                .data(accountServices.remoteLogoutAll(token))
                .statusCode(200)
                .build()
        );
    }

    @PostMapping("/update-profile")
    public ResponseEntity<?> updateProfile(
            @RequestHeader(name = "Authorization") String token,
            @RequestParam(name = "avatar", required = false) MultipartFile avatar,
            @RequestParam(name = "fullName") String name
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Update profile success")
                .data(accountServices.updateProfile(token, avatar, name))
                .statusCode(200)
                .build()
        );
    }
}
