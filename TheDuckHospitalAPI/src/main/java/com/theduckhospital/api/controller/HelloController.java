package com.theduckhospital.api.controller;


import com.google.firebase.messaging.FirebaseMessagingException;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.repository.AccountRepository;
import com.theduckhospital.api.services.IFirebaseServices;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HelloController {
    public HelloController() {
    }

    @GetMapping
    public String helloWorld() {
        return "Hello World!!!";
    }
}
