package com.theduckhospital.api.controller.headdoctor;

import com.theduckhospital.api.dto.request.headdoctor.CreateDoctorScheduleRequest;
import com.theduckhospital.api.dto.request.headdoctor.UpdateDoctorScheduleRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IDoctorServices;
import com.theduckhospital.api.services.IRoomServices;
import com.theduckhospital.api.services.IScheduleDoctorServices;
import jakarta.validation.Valid;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.locks.ReentrantLock;

@RestController
@RequestMapping("/api/head-doctor/schedules")
@PreAuthorize("hasRole('ROLE_HEAD_DOCTOR')")
public class ScheduleHeadDoctorController {
    private final IScheduleDoctorServices scheduleDoctorServices;
    private final ReentrantLock lock = new ReentrantLock();
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
        lock.lock();
        try {
            return ResponseEntity.ok(
                    GeneralResponse.builder()
                            .success(true)
                            .message("Create doctor schedule successfully")
                            .data(scheduleDoctorServices
                                    .createDoctorSchedule(authorizationHeader, request)
                            )
                            .build()
            );
        } finally {
            lock.unlock();
        }
    }

    @GetMapping("/invalid-examination-date")
    public ResponseEntity<?> getInvalidExaminationDate(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam int roomId,
            @RequestParam UUID doctorId
    ){
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get available day of week successfully")
                        .data(scheduleDoctorServices
                                .getInvalidExaminationDateSchedule(authorizationHeader, roomId, doctorId)
                        )
                        .build()
        );
    }

    @GetMapping("/invalid-treatment-date")
    public ResponseEntity<?> getInvalidTreatmentDate(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam int roomId,
            @RequestParam UUID doctorId
    ){
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get available day of week successfully")
                        .data(scheduleDoctorServices
                                .getInvalidTreatmentDateSchedule(authorizationHeader, roomId, doctorId)
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

    @GetMapping("/examination-rooms")
    public ResponseEntity<?> getExaminationRoomsDepartment(@RequestHeader("Authorization") String authorizationHeader) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get examination rooms in department successfully")
                        .data(roomServices.getExaminationRoomsDepartment(authorizationHeader))
                        .build()
        );
    }

    @GetMapping("/treatment-rooms")
    public ResponseEntity<?> getTreatmentRoomsDepartment(@RequestHeader("Authorization") String authorizationHeader) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get treatment rooms in department successfully")
                        .data(roomServices.getTreatmentRoomsDepartment(authorizationHeader))
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

    @GetMapping("/{doctorScheduleId}/active-doctors/{staffId}")
    public ResponseEntity<?> getDoctorsInDepartmentHasNoScheduleOnDate(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable UUID doctorScheduleId,
            @PathVariable UUID staffId,
            @RequestParam boolean isExamination
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get doctors successfully")
                        .data(scheduleDoctorServices.getDoctorsInDepartmentHasNoScheduleOnDate(
                                authorizationHeader,
                                doctorScheduleId,
                                staffId,
                                isExamination
                        ))
                        .build()
        );
    }

    @GetMapping("/examination-rooms-pagination")
    public ResponseEntity<?> getPaginationExaminationRoomsDepartment(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int limit

    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get examination rooms in department successfully")
                        .data(roomServices.getPaginationExaminationRooms(authorizationHeader, page, limit))
                        .build()
        );
    }

    @GetMapping("/treatment-rooms-pagination")
    public ResponseEntity<?> getPaginationTreatmentRoomsDepartment(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int limit

    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get rooms in department successfully")
                        .data(roomServices.getPaginationTreatmentRooms(authorizationHeader, page, limit))
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
