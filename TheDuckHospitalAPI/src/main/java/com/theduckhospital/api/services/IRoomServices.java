package com.theduckhospital.api.services;

import com.theduckhospital.api.constant.RoomType;
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
    List<Room> getExaminationRoomsDepartment(String authorization);
    List<Room> getTreatmentRoomsDepartment(String authorization);
    PaginationRoomsResponse getPaginationRooms(
            String authorization,
            int page,
            int limit
    );
    List<RoomType> getRoomTypes();
    /**
     * Get all rooms by type
     * @param roomTypes list of room types
     * @return list of rooms by types
     */
    List<Room> getRoomsByType(List<RoomType> roomTypes);
    void saveRoom(Room room);
}
