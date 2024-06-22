package com.theduckhospital.api.controller.nurse;

import com.theduckhospital.api.constant.RoomType;
import com.theduckhospital.api.dto.request.nurse.UpdateRoomHospitalAdmission;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IHospitalAdmissionServices;
import com.theduckhospital.api.services.IRoomServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/nurse/hospital-admissions")
@PreAuthorize("hasRole('NURSE') || hasRole('HEAD_NURSE')")
public class NurseHospitalAdmissionController {
    private final IRoomServices roomServices;
    private final IHospitalAdmissionServices hospitalAdmissionServices;

    public NurseHospitalAdmissionController(
            IRoomServices roomServices,
            IHospitalAdmissionServices hospitalAdmissionServices
    ) {
        this.roomServices = roomServices;
        this.hospitalAdmissionServices = hospitalAdmissionServices;
    }

    @GetMapping("/room-statistics")
    public ResponseEntity<?> getRoomStatistics(
            @RequestHeader(value = "Authorization") String authorization
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .statusCode(200)
                        .message("Get room statistics successfully")
                        .data(roomServices.getRoomStatistic(authorization))
                        .build()
        );
    }

    @GetMapping("/treatment-rooms")
    public ResponseEntity<?> getTreatmentRooms(
            @RequestHeader(value = "Authorization") String authorization,
            @RequestParam(
                    value = "roomType",
                    defaultValue = "TREATMENT_ROOM_STANDARD"
            ) RoomType roomType
    ) {

        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .statusCode(200)
                        .message("Get treatment rooms successfully")
                        .data(roomServices.getTreatmentRoomDetails(
                                authorization,
                                roomType
                        ))
                        .build()
        );
    }

    @PostMapping
    public ResponseEntity<?> updateRoomHospitalAdmission(
            @RequestHeader(value = "Authorization") String authorization,
            @RequestBody UpdateRoomHospitalAdmission request
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .statusCode(200)
                        .message("Update room hospital admission successfully")
                        .data(hospitalAdmissionServices.updateRoomHospitalAdmission(
                                authorization,
                                request
                        ))
                        .build()
        );
    }

    @GetMapping("/{hospitalAdmissionCode}")
    public ResponseEntity<?> getHospitalAdmissionDetails(
            @RequestHeader(value = "Authorization") String authorization,
            @PathVariable String hospitalAdmissionCode
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .statusCode(200)
                        .message("Get hospital admission details successfully")
                        .data(hospitalAdmissionServices.getHospitalAdmissionDetails(
                                authorization,
                                hospitalAdmissionCode
                        ))
                        .build()
        );
    }

}
