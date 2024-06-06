package com.theduckhospital.api.controller.patient;

import com.theduckhospital.api.dto.request.BookingRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IBookingServices;
import com.theduckhospital.api.services.IPaymentServices;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/booking")
public class BookingController {
    private final IBookingServices bookingServices;
    private final IPaymentServices paymentServices;

    public BookingController(
            IBookingServices bookingServices,
            IPaymentServices paymentServices
    ) {
        this.bookingServices = bookingServices;
        this.paymentServices = paymentServices;
    }

    @PostMapping
    public ResponseEntity<?> createBookingAndPayment(
            @RequestBody @Valid BookingRequest bookingRequest,
            @RequestHeader(name = "Authorization") String token,
            HttpServletRequest request
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Create booking and payment successfully")
                        .data(bookingServices
                                .createBookingAndPayment(
                                        token,
                                        bookingRequest,
                                        request.getHeader("origin")
                                )
                        )
                        .build()
        );
    }

    @GetMapping("/callback/vnPay")
    public void callBackVNPay(
            @RequestParam(required=false) Map<String,String> params,
            HttpServletResponse response
    ) throws IOException {
        String url = paymentServices.checkVNPayBookingCallback(params);
        response.sendRedirect(url);
    }

    @PostMapping("/callback/momo")
    public ResponseEntity<?> callBackMomo(
            @RequestBody Map<String,String> params
    ) throws Exception {
        if (paymentServices.checkMomoBookingCallback(params))
            return ResponseEntity.status(204).body(null);

        return ResponseEntity.status(400).body(null);
    }

    @GetMapping
    public ResponseEntity<?> getBookings(
            @RequestHeader(name = "Authorization") String token
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get booking successfully")
                        .data(bookingServices.getBookings(token))
                        .build()
        );
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<?> getBooking(
            @RequestHeader(name = "Authorization") String token,
            @PathVariable("bookingId") UUID bookingId
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get booking successfully")
                        .data(bookingServices.getBooking(token, bookingId))
                        .build()
        );
    }
}
