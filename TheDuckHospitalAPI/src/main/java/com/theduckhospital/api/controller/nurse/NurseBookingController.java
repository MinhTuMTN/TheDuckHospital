package com.theduckhospital.api.controller.nurse;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.dto.response.nurse.NurseBookingItemResponse;
import com.theduckhospital.api.services.IBookingServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/nurse/bookings")
@PreAuthorize("hasRole('ROLE_NURSE')")
public class NurseBookingController {
    private final IBookingServices bookingServices;

    public NurseBookingController(IBookingServices bookingServices) {
        this.bookingServices = bookingServices;
    }

    @GetMapping("/check-booking")
    public ResponseEntity<?> checkBooking(
            @RequestParam(name = "bookingCode") String bookingCode,
            @RequestParam(name = "roomId") int roomId
    ) {
        NurseBookingItemResponse booking = bookingServices
                .checkBooking(bookingCode, roomId);

        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Check booking successfully")
                .data(booking)
                .build()
        );
    }

    @GetMapping("/check-patient-code")
    public ResponseEntity<?> checkPatientCode(
            @RequestParam(name = "identityNumber") String identityNumber
    ) {
        Map<String, String> data = bookingServices
                .checkPatientCode(identityNumber);

        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Check patient code successfully")
                .data(data)
                .build()
        );
    }
}
