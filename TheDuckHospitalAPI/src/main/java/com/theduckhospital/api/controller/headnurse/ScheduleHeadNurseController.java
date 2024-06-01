package com.theduckhospital.api.controller.headnurse;

import com.theduckhospital.api.constant.NurseType;
import com.theduckhospital.api.constant.RoomType;
import com.theduckhospital.api.dto.request.headnurse.CreateExamNurseScheduleRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.INurseServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.locks.ReentrantLock;

@RestController
@RequestMapping("/api/head-nurse/schedules")
@PreAuthorize("hasRole('ROLE_HEAD_NURSE')")
public class ScheduleHeadNurseController {
    private final INurseServices nurseServices;
    private final ReentrantLock lock = new ReentrantLock();

    public ScheduleHeadNurseController(INurseServices nurseServices) {
        this.nurseServices = nurseServices;
    }

    @GetMapping("/nurses")
    public ResponseEntity<?> getActiveDoctorsPagination(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "CLINICAL_NURSE") NurseType nurseType,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int limit
    ){
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get active doctors pagination successfully")
                        .data(nurseServices.getPaginationActiveNursesDepartment(
                                authorizationHeader,
                                search,
                                nurseType,
                                page,
                                limit
                        ))
                        .build()
        );
    }

    @GetMapping("/rooms")
    public ResponseEntity<?> getRoomsDepartment(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam(defaultValue = "EXAMINATION_ROOM") RoomType roomType
    ){
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get rooms department successfully")
                        .data(nurseServices.getRoomsDepartment(
                                authorizationHeader,
                                roomType
                        ))
                        .build()
        );
    }

    @GetMapping("/rooms/{roomId}/examination-room-schedules")
    public ResponseEntity<?> getExaminationRoomSchedules(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable int roomId
    ){
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get examination room schedules successfully")
                        .data(nurseServices.getExaminationRoomSchedules(
                                authorizationHeader,
                                roomId
                        ))
                        .build()
        );
    }

    @PostMapping("/rooms/{roomId}/examination-room-schedules")
    public ResponseEntity<?> createExaminationRoomSchedules(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable int roomId,
            @RequestBody CreateExamNurseScheduleRequest request
    ){
        lock.lock();
        try {
            return ResponseEntity.ok(
                    GeneralResponse.builder()
                            .success(true)
                            .message("Create examination room schedules successfully")
                            .data(nurseServices.createExaminationRoomSchedules(
                                    authorizationHeader,
                                    roomId,
                                    request
                            ))
                            .build()
            );
        } finally {
            lock.unlock();
        }
    }
}