package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.admin.CreateRoomRequest;
import com.theduckhospital.api.dto.response.admin.FilteredRoomsResponse;
import com.theduckhospital.api.dto.response.admin.RoomResponse;
import com.theduckhospital.api.entity.Room;

import java.util.List;

public interface IRoomServices {
    RoomResponse createRoom(CreateRoomRequest request);
    RoomResponse updateRoom(int roomId, CreateRoomRequest request);
    boolean deleteRoom(int roomId);
    RoomResponse restoreRoom(int roomId);
    FilteredRoomsResponse getPaginationRoomsDeleted(int page, int limit);
    List<RoomResponse> getAllRoomsDeleted();
    RoomResponse getRoomById(int roomId);
    Room findRoomById(int roomId);
    List<RoomResponse> findRoomByRoomName(String roomName);
}
