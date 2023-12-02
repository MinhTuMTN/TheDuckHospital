package com.theduckhospital.api.controller;

import com.theduckhospital.api.services.IMSGraphServices;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/")
public class HelloController {
    private final IMSGraphServices graphServices;

    public HelloController(IMSGraphServices graphServices) {
        this.graphServices = graphServices;
    }

    @GetMapping
    public String hello() {
        return graphServices.createMSGraphUser("Phạm Chí Vịnh",
                "vinhpc@theduckhospital.onmicrosoft.com");
    }
}
