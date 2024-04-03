package com.theduckhospital.api.controller;


import com.google.firebase.messaging.FirebaseMessagingException;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.repository.AccountRepository;
import com.theduckhospital.api.services.IFirebaseServices;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HelloController {
    private final AccountRepository accountRepository;
    private final IFirebaseServices firebaseServices;


    public HelloController(AccountRepository accountRepository, IFirebaseServices firebaseServices) {
        this.accountRepository = accountRepository;
        this.firebaseServices = firebaseServices;
    }

    @GetMapping
    public String hello(@RequestParam(name = "amount", defaultValue = "10000") String amount) throws IOException {
        return "Hello World!";
    }

    @GetMapping("/notification")
    public String notification() throws FirebaseMessagingException {
        Account account = accountRepository.findAccountByPhoneNumberAndDeletedIsFalse("0372717437");
        Map<String, String> data = Map.of("title", "Thông báo", "body", "Xin chào!");
        firebaseServices.sendNotificationToAccount(account, data);
        return "Notification";
    }
}
