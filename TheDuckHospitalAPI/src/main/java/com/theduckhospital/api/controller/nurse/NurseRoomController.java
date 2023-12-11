package com.theduckhospital.api.controller.nurse;

import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IRoomServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/nurse/rooms")
@PreAuthorize("hasRole('ROLE_NURSE')")
public class NurseRoomController {
    private final IRoomServices roomServices;

    public NurseRoomController(IRoomServices roomServices) {
        this.roomServices = roomServices;
    }

    @GetMapping
    public ResponseEntity<?> findRooms(
            @RequestParam(value = "q") String roomName
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(roomServices.findRoomByRoomName(roomName))
                        .build()
        );
    }
}
