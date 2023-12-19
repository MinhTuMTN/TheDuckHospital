package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.admin.CreateRoomRequest;
import com.theduckhospital.api.dto.response.admin.FilteredRoomsResponse;
import com.theduckhospital.api.dto.response.admin.RoomResponse;
import com.theduckhospital.api.dto.response.doctor.PaginationRoomsResponse;
import com.theduckhospital.api.entity.Room;

import java.text.ParseException;
import java.util.List;

public interface IRoomServices {
    RoomResponse createRoom(CreateRoomRequest request);
    RoomResponse updateRoom(int roomId, CreateRoomRequest request);
    boolean deleteRoom(int roomId);
    RoomResponse restoreRoom(int roomId);

    FilteredRoomsResponse getPaginationFilteredRooms(
            String authorization,
            int page,
            int limit
    );

    List<RoomResponse> getAllRoomsDeleted();
    RoomResponse getRoomById(int roomId);
    Room findRoomById(int roomId);
    List<RoomResponse> findRoomByRoomName(String roomName);

    Object getTodayDoctorSchedules(int roomId) throws ParseException;

    List<Room> getRoomsDepartment(String authorization);

    PaginationRoomsResponse getPaginationRooms(
            String authorization,
            int page,
            int limit
    );
}
