package com.theduckhospital.api.controller;

import com.theduckhospital.api.services.IVNPayServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

@RestController
@RequestMapping("/")
public class HelloController {
    @Autowired
    private IVNPayServices vnPayServices;

    @Autowired
    private JavaMailSender emailSender;


    @GetMapping
    public String hello() throws UnsupportedEncodingException {
        UUID tractionId = UUID.randomUUID();
        System.out.println(tractionId);
        return vnPayServices.createPaymentUrl(50000, tractionId);
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


}
