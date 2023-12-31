package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IScheduleDoctorServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/doctor-schedules")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class DoctorScheduleAdminController {
    private final IScheduleDoctorServices scheduleDoctorServices;

    public DoctorScheduleAdminController(IScheduleDoctorServices scheduleDoctorServices) {
        this.scheduleDoctorServices = scheduleDoctorServices;
    }

    @GetMapping("/room")
    public ResponseEntity<?> getDoctorScheduleByRoomAndDate(@RequestParam int roomId, @RequestParam Date date) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get schedule successfully")
                        .data(scheduleDoctorServices.getDoctorSchedulesByRoomAndDateAdmin(roomId, date))
                        .build()
        );
    }

    @GetMapping("/doctor")
    public ResponseEntity<?> getDoctorScheduleByDoctorAndDate(@RequestParam UUID staffId, @RequestParam Date date) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get schedule successfully")
                        .data(scheduleDoctorServices.getDoctorSchedulesByDoctorAndDateAdmin(staffId, date))
                        .build()
        );
    }

    @GetMapping("/{staffId}/date-has-schedule")
    public ResponseEntity<?> getDateHasDoctorSchedule(@PathVariable UUID staffId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get schedule successfully")
                        .data(scheduleDoctorServices.getDateHasDoctorSchedule(staffId))
                        .build()
        );
    }

    @GetMapping("/room/{roomId}/date-has-schedule")
    public ResponseEntity<?> getDateHasDoctorScheduleRoom(@PathVariable int roomId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get schedule successfully")
                        .data(scheduleDoctorServices.getDateHasDoctorScheduleRoom(roomId))
                        .build()
        );
    }

}
