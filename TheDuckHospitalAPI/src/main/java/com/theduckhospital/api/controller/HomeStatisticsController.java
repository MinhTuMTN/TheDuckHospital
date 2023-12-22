package com.theduckhospital.api.controller;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IStatisticsServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/statistics")
public class HomeStatisticsController {
    private final IStatisticsServices statisticsServices;

    public HomeStatisticsController(IStatisticsServices statisticsServices) {
        this.statisticsServices = statisticsServices;
    }

    @GetMapping
    public ResponseEntity<?> getHomeStatistics() {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get statistics successfully")
                        .data(statisticsServices.getHomeStatistics())
                        .build()
        );
    }
}
