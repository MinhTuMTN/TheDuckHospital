package com.theduckhospital.api.controller;

import com.theduckhospital.api.constant.VNPayConfig;
import com.theduckhospital.api.services.IMSGraphServices;
import com.theduckhospital.api.services.IVNPayServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
public class HelloController {
    @Autowired
    private IVNPayServices vnPayServices;

    @Autowired
    private JavaMailSender emailSender;


    @GetMapping
    public String hello() throws UnsupportedEncodingException {
        return vnPayServices.createPaymentUrl(50000);
    }

    @GetMapping("/test")
    public String test() {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("nguyenminhtu00030@gmail.com");
        message.setTo("vinhpc@theduckhospital.onmicrosoft.com");
        message.setSubject("hello");
        message.setText("test");
        emailSender.send(message);
        return "ok";
    }

    @GetMapping("/callback")
    public boolean callBackVNPay(@RequestParam(required=false) Map<String,String> params) {
        Map results = new HashMap();
        List<String> keys = params.keySet().stream().toList();
        for (String key : keys) {
            results.put(
                    URLEncoder.encode(key, StandardCharsets.US_ASCII),
                    URLEncoder.encode(params.get(key), StandardCharsets.US_ASCII)
            );

//            System.out
        }

        results.remove("vnp_SecureHashType");
        results.remove("vnp_SecureHash");
        String secureHash = VNPayConfig.hashAllFields(results);
        System.out.println(secureHash);
        String vnp_SecureHash = params.get("vnp_SecureHash");
        System.out.println(vnp_SecureHash);
        return secureHash.equals(vnp_SecureHash);

        // Why is vnp_SecureHash not equal to secureHash?
        // Because vnp_SecureHash is encoded by URLEncoder.encode() method
        // and secureHash is encoded by java.net.URLEncoder.encode() method
        // and they are not the same.

        // How to fix this?
        // Use java.net.URLEncoder.encode() method to encode vnp_SecureHash
        // and then compare it with secureHash.

    }
}
