package com.theduckhospital.api.controller.headdoctor;

import com.theduckhospital.api.dto.request.headdoctor.CreateDoctorScheduleRequest;
import com.theduckhospital.api.dto.request.headdoctor.UpdateDoctorScheduleRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IDoctorServices;
import com.theduckhospital.api.services.IRoomServices;
import com.theduckhospital.api.services.IScheduleDoctorServices;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("/api/head-doctor/schedules")
@PreAuthorize("hasRole('ROLE_HEAD_DOCTOR')")
public class ScheduleHeadDoctorController {
    private final IScheduleDoctorServices scheduleDoctorServices;
    private final IDoctorServices doctorServices;
    private final IRoomServices roomServices;

    public ScheduleHeadDoctorController(
            IScheduleDoctorServices scheduleDoctorServices,
            IRoomServices roomServices,
            IDoctorServices doctorServices
    ) {
        this.scheduleDoctorServices = scheduleDoctorServices;
        this.roomServices = roomServices;
        this.doctorServices = doctorServices;
    }

    @PostMapping
    public ResponseEntity<?> createDoctorSchedule(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody @Valid CreateDoctorScheduleRequest request
    ) throws ParseException {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Create doctor schedule successfully")
                        .data(scheduleDoctorServices
                                .createDoctorSchedule(authorizationHeader, request)
                        )
                        .build()
        );
    }

    @GetMapping("/invalid-date")
    public ResponseEntity<?> getInvalidDate(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam int roomId,
            @RequestParam UUID doctorId
    ){
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get available day of week successfully")
                        .data(scheduleDoctorServices
                                .getInvalidDateSchedule(authorizationHeader, roomId, doctorId)
                        )
                        .build()
        );
    }

    @GetMapping("/date-has-schedule")
    public ResponseEntity<?> getDateHasSchedule(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam int roomId
    ){
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get days has schedule successfully")
                        .data(scheduleDoctorServices
                                .getDateHasSchedule(authorizationHeader, roomId)
                        )
                        .build()
        );
    }

    @DeleteMapping("/{doctorScheduleId}")
    public ResponseEntity<?> deletedDoctorSchedule(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable UUID doctorScheduleId
    ){
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Doctor schedule deleted successfully")
                        .data(scheduleDoctorServices
                                .deleteDoctorSchedule(authorizationHeader, doctorScheduleId)
                        )
                        .build()
        );
    }

    @GetMapping("/rooms")
    public ResponseEntity<?> getRoomsDepartment(@RequestHeader("Authorization") String authorizationHeader) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get rooms in department successfully")
                        .data(roomServices.getRoomsDepartment(authorizationHeader))
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<?> getScheduleHeadDoctor(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam int roomId,
            @RequestParam Date date
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get schedules successfully")
                        .data(scheduleDoctorServices.getScheduleHeadDoctor(authorizationHeader, roomId, date))
                        .build()
        );
    }

    @GetMapping("/active-doctors")
    public ResponseEntity<?> getActiveDoctors(@RequestHeader("Authorization") String authorizationHeader) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get doctors successfully")
                        .data(scheduleDoctorServices.getActiveDoctorsInDepartment(authorizationHeader))
                        .build()
        );
    }

    @GetMapping("/rooms-pagination")
    public ResponseEntity<?> getPaginationRoomsDepartment(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int limit

    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get rooms in department successfully")
                        .data(roomServices.getPaginationRooms(authorizationHeader, page, limit))
                        .build()
        );
    }


    @GetMapping("/doctors/filter")
    public ResponseEntity<?> getActiveDoctorsPagination(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int limit
    ){
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get active doctors pagination successfully")
                        .data(doctorServices.getPaginationActiveDoctorsDepartment(
                                authorizationHeader,
                                search,
                                page,
                                limit
                        ))
                        .build()
        );
    }

    @PutMapping("/{doctorScheduleId}")
    public ResponseEntity<?> updateDoctorSchedule(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable UUID doctorScheduleId,
            @RequestBody UpdateDoctorScheduleRequest request
            ){
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Update doctor schedule successfully")
                        .data(scheduleDoctorServices.updateDoctorSchedule(authorizationHeader, doctorScheduleId, request))
                        .build()
        );
    }
}
