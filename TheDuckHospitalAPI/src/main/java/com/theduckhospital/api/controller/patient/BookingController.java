package com.theduckhospital.api.controller.patient;

import com.theduckhospital.api.dto.request.BookingRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IBookingServices;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/booking")
public class BookingController {
    private final IBookingServices bookingServices;

    public BookingController(IBookingServices bookingServices) {
        this.bookingServices = bookingServices;
    }

    @PostMapping
    public ResponseEntity<?> createBookingAndPayment(
            @RequestBody @Valid BookingRequest bookingRequest,
            @RequestHeader(name = "Authorization") String token
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Create booking and payment successfully")
                        .data(bookingServices.createBookingAndPayment(token, bookingRequest))
                        .build()
        );
    }

    @GetMapping("/callback")
    public void callBackVNPay(
            @RequestParam(required=false) Map<String,String> params,
            HttpServletResponse response
    ) throws IOException {
        if (bookingServices.checkBookingCallback(params))
            response.sendRedirect("http://localhost:3000/payment-success");
        else
            response.sendRedirect("http://localhost:3000/payment-failed");
    }
}
