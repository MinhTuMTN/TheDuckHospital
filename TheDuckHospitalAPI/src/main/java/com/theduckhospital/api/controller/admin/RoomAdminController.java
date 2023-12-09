package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.dto.request.admin.CreateRoomRequest;
import com.theduckhospital.api.dto.request.GeneralResponse;
import com.theduckhospital.api.services.IRoomServices;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/rooms")
//@PreAuthorize("hasRole('ROLE_ADMIN')")
public class RoomAdminController {
    private final IRoomServices roomServices;

    public RoomAdminController(IRoomServices roomServices) {
        this.roomServices = roomServices;
    }

    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody @Valid CreateRoomRequest request) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Create room successfully")
                        .data(roomServices.createRoom(request))
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<?> getAllRooms() {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get all rooms successfully")
                        .data(roomServices.getAllRoomsDeleted())
                        .build()
        );
    }

    @GetMapping("/filter")
    public ResponseEntity<?> getAllRooms(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int limit
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get all rooms successfully")
                        .data(roomServices.getPaginationRoomsDeleted(page, limit))
                        .build()
        );
    }

    @GetMapping("/{roomId}")
    public  ResponseEntity<?> getRoomById(@PathVariable int roomId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get room by id successfully")
                        .data(roomServices.getRoomById(roomId))
                        .build()
        );
    }

    @PutMapping("/{roomId}")
    public ResponseEntity<?> updateRoom(
            @PathVariable int roomId,
            @RequestBody CreateRoomRequest request) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Update room successfully")
                        .data(roomServices.updateRoom(roomId, request))
                        .build()
        );
    }

    @DeleteMapping("/{roomId}")
    public ResponseEntity<?> deleteRoom(@PathVariable int roomId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Delete room successfully")
                        .data(roomServices.deleteRoom(roomId))
                        .build()
        );
    }

    @PutMapping("/{roomId}/restore")
    public ResponseEntity<?> restoreRoom(@PathVariable int roomId) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Restore room successfully")
                        .data(roomServices.restoreRoom(roomId))
                        .build()
        );
    }
}
