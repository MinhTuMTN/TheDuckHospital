package com.theduckhospital.api.controller.nurse;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IScheduleDoctorServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/api/nurse/doctor-schedules")
public class NurseDoctorScheduleController {
    private final IScheduleDoctorServices scheduleDoctorServices;

    public NurseDoctorScheduleController(IScheduleDoctorServices scheduleDoctorServices) {
        this.scheduleDoctorServices = scheduleDoctorServices;
    }

    @GetMapping
    public ResponseEntity<?> getDoctorSchedules(
            @RequestParam(name = "departmentId", required = false) Integer departmentId
    ) throws ParseException {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get doctor schedules successfully")
                        .data(
                                scheduleDoctorServices.getDoctorSchedulesByDepartmentId(
                                        departmentId
                                )
                        )
                        .build()
        );
    }
}
