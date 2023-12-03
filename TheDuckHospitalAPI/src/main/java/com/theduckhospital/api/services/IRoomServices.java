package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.CreateRoomRequest;
import com.theduckhospital.api.dto.response.RoomResponse;

import java.util.List;

public interface IRoomServices {
    RoomResponse createRoom(CreateRoomRequest request);
    RoomResponse updateRoom(int roomId, CreateRoomRequest request);
    boolean deleteRoom(int roomId);
    RoomResponse restoreRoom(int roomId);
    List<RoomResponse> getAllRoomsDeleted();
}
