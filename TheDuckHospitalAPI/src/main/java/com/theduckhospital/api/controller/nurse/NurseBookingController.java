package com.theduckhospital.api.controller.nurse;

import com.theduckhospital.api.dto.request.nurse.NurseCreateBookingRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.dto.response.nurse.NurseBookingItemResponse;
import com.theduckhospital.api.services.IBookingServices;
import com.theduckhospital.api.services.IMedicalExamServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Map;

@RestController
@RequestMapping("/api/nurse/bookings")
@PreAuthorize("hasRole('ROLE_NURSE')")
public class NurseBookingController {
    private final IBookingServices bookingServices;
    private final IMedicalExamServices medicalExamServices;

    public NurseBookingController(IBookingServices bookingServices, IMedicalExamServices medicalExamServices) {
        this.bookingServices = bookingServices;
        this.medicalExamServices = medicalExamServices;
    }

    @GetMapping("/check-booking")
    public ResponseEntity<?> checkBooking(
            @RequestParam(name = "bookingCode") String bookingCode,
            @RequestParam(name = "roomId") int roomId
    ) throws ParseException {
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

    @PostMapping
    public ResponseEntity<?> createBookingAndMedicalExamRecord(
            @RequestBody NurseCreateBookingRequest request
    ) throws ParseException {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .message("Create booking and payment successfully")
                .data(medicalExamServices.nurseCreateMedicalExamRecord(request))
                .build()
        );
    }
}
