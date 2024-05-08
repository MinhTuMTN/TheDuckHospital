package com.theduckhospital.api.controller.patient;

import com.theduckhospital.api.dto.request.BookingRequest;
import com.theduckhospital.api.dto.request.admin.AddRatingRequest;
import com.theduckhospital.api.dto.request.admin.CreateDepartmentRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IBookingServices;
import com.theduckhospital.api.services.IRatingServices;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/rating")
public class RatingController {
    private final IRatingServices ratingServices;

    public RatingController(IRatingServices ratingServices) {
        this.ratingServices = ratingServices;
    }

    @PostMapping
    public ResponseEntity<?> addRating(@RequestBody @Valid AddRatingRequest request) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Rated successfully")
                        .data(ratingServices.addRating(request))
                        .build()
        );
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<?> getRatingByBookingId(@PathVariable("bookingId") UUID bookingId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get rating successfully")
                        .data(ratingServices.getRatingByBookingId(bookingId))
                        .build()
        );
    }
}
