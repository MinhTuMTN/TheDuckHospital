package com.theduckhospital.api.controller;


import com.google.gson.JsonObject;
import okhttp3.*;
import okhttp3.RequestBody;
import org.apache.commons.codec.binary.Hex;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HelloController {
    @GetMapping
    public String hello(@RequestParam(name = "amount", defaultValue = "10000") String amount) throws IOException {
        return "Hello World!";
    }
}
