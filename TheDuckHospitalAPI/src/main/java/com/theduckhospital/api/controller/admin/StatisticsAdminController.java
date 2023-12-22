package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IStatisticsServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/admin/statistics")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class StatisticsAdminController {
    private final IStatisticsServices statisticsServices;

    public StatisticsAdminController(IStatisticsServices statisticsServices) {
        this.statisticsServices = statisticsServices;
    }

    @GetMapping
    public ResponseEntity<?> getStatistics() {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get statistics successfully")
                        .data(statisticsServices.getStatistics())
                        .build()
        );
    }

    @GetMapping("/revenue")
    public ResponseEntity<?> getRevenueStatistics(
            @RequestParam Date startDate,
            @RequestParam Date endDate
            ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get revenue statistics successfully")
                        .data(statisticsServices.getRevenueStatistics(startDate, endDate))
                        .build()
        );
    }
    @GetMapping("/booking")
    public ResponseEntity<?> getBookingStatistics(
            @RequestParam Date startDate,
            @RequestParam Date endDate
            ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get booking statistics successfully")
                        .data(statisticsServices.getBookingStatistics(startDate, endDate))
                        .build()
        );
    }

}
