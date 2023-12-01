package com.theduckhospital.api.controller;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.theduckhospital.api.services.ICloudinaryServices;
import com.theduckhospital.api.services.IFirebaseServices;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HelloController {

    private final IFirebaseServices firebaseServices;

    public  HelloController(IFirebaseServices firebaseServices) {
        this.firebaseServices = firebaseServices;
    }
    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String helloWorld() throws FirebaseMessagingException {
        Map<String, String> data = new HashMap<>();
        data.put("phoneNumber", "+84372913432");
        data.put("message", "Hello world");
        boolean result = firebaseServices.sendNotification(
                "foTiLstJQVGkrT5nEsNyOC:APA91bGz4Fw9RyVIdPqw79-qG_41yjWya5nSacDvwNock9N-j2rv9EZaW53NYGMf_7oecDjUqVP-mreqfhEQtVSWu2ogh3g_ezSLI5SSn6D28_DDkVQhdUgjNiM6YTnpJIHyUjhReKg6",
                "Hello world",
                "Hello world",
                data
        );

        return "Hello world";
    }

}
