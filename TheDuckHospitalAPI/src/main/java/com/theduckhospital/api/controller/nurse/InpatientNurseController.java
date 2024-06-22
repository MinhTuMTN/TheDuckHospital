package com.theduckhospital.api.controller.nurse;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IInpatientServices;
import com.theduckhospital.api.services.IRoomServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inpatient-nurse")
@PreAuthorize("hasRole('NURSE') || hasRole('HEAD_NURSE')")
public class InpatientNurseController {
    private final IInpatientServices inpatientServices;

    public InpatientNurseController(IInpatientServices inpatientServices) {
        this.inpatientServices = inpatientServices;
    }

    @GetMapping("/treatment-room")
    public ResponseEntity<?> getTreatmentRoomBySchedule(
            @RequestHeader("Authorization") String authorization
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Get treatment room by schedule successfully")
                .data(inpatientServices.getTreatmentRoomBySchedule(authorization))
                .build()
        );
    }

    @GetMapping("/treatment-room/{roomId}/patients")
    public ResponseEntity<?> getPatientsByRoom(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("roomId") int roomId
    ) {
        return ResponseEntity.ok(GeneralResponse.builder()
                .success(true)
                .statusCode(200)
                .message("Get patients by room successfully")
                .data(inpatientServices.getPatientsByRoom(roomId))
                .build()
        );
    }
}
