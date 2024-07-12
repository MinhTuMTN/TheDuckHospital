package com.theduckhospital.api.controller;


import com.theduckhospital.api.services.IRoomServices;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class HelloController {
    private final IRoomServices roomServices;
    public HelloController(IRoomServices roomServices) {
        this.roomServices = roomServices;
    }

    @GetMapping
    public String helloWorld() {
        return "Hello World!";
    }

    @GetMapping("/reset")
    public String resetLaboratoryRoom() {
        roomServices.resetLaboratoryRoom();
        return "Reset laboratory room successfully!";
    }
}
