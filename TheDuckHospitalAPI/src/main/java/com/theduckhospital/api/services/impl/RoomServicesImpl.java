package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.dto.request.admin.CreateRoomRequest;
import com.theduckhospital.api.dto.response.admin.FilteredRoomsResponse;
import com.theduckhospital.api.dto.response.admin.RoomResponse;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Room;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.RoomRepository;
import com.theduckhospital.api.services.IDepartmentServices;
import com.theduckhospital.api.services.IRoomServices;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RoomServicesImpl implements IRoomServices {
    private final RoomRepository roomRepository;
    private final IDepartmentServices departmentServices;

    public RoomServicesImpl(RoomRepository roomRepository, IDepartmentServices departmentServices) {
        this.roomRepository = roomRepository;
        this.departmentServices = departmentServices;
    }
    @Override
    public RoomResponse createRoom(CreateRoomRequest request) {
        Department department = null;
        if (request.getDepartmentId() != null)
            department = departmentServices.getDepartmentById(request.getDepartmentId());

        Room room = new Room();
        room.setRoomName(request.getRoomName());
        room.setDescription(request.getDescription());
        room.setDepartment(department);
        room.setDeleted(false);

        return new RoomResponse(roomRepository.save(room));
    }

    @Override
    public RoomResponse updateRoom(int roomId, CreateRoomRequest request) {
        Department department = null;
        if (request.getDepartmentId() != null)
            department = departmentServices.getDepartmentById(request.getDepartmentId());

        Optional<Room> optional = roomRepository.findById(roomId);
        if (optional.isEmpty() || optional.get().isDeleted()) {
            throw new NotFoundException("Room not found");
        }

        Room room = optional.get();
        room.setRoomName(request.getRoomName() == null ?
                room.getRoomName() :
                request.getRoomName());
        room.setDescription(request.getDescription() == null ?
                room.getDescription() :
                request.getDescription());
        room.setDepartment(department == null ?
                room.getDepartment() :
                department);

        return new RoomResponse(roomRepository.save(room));
    }

    @Override
    public boolean deleteRoom(int roomId) {
        Optional<Room> optional = roomRepository.findById(roomId);
        if (optional.isEmpty() || optional.get().isDeleted()) {
            throw new NotFoundException("Room not found");
        }

        Room room = optional.get();
        room.setDeleted(true);
        roomRepository.save(room);

        return true;
    }

    @Override
    public RoomResponse restoreRoom(int roomId) {
        Optional<Room> optional = roomRepository.findById(roomId);
        if (optional.isEmpty() || !optional.get().isDeleted()) {
            throw new NotFoundException("Room not found");
        }

        Room room = optional.get();
        room.setDeleted(false);
        return new RoomResponse(roomRepository.save(room));
    }

    @Override
    public FilteredRoomsResponse getPaginationRoomsDeleted(int page, int limit) {
        Pageable pageable = PageRequest.of(page, limit);
        Page<Room> roomPage = roomRepository.findPaginationByOrderByDeleted(pageable);

        List<RoomResponse> filteredRooms = new ArrayList<>();

        for (Room room : roomPage.getContent()) {
            filteredRooms.add(new RoomResponse(room));
        }

        List<RoomResponse> rooms = getAllRoomsDeleted();

        return new FilteredRoomsResponse(filteredRooms, rooms.size(), page, limit);
    }

    @Override
    public List<RoomResponse> getAllRoomsDeleted() {
        List<RoomResponse> responses = new ArrayList<>();

        for (Room room : roomRepository.findAllByOrderByDeleted()) {
            responses.add(new RoomResponse(room));
        }

        return responses;
    }

    @Override
    public RoomResponse getRoomById(int roomId) {
        Optional<Room> optional = roomRepository.findById(roomId);
        if (optional.isEmpty()) {
            throw new NotFoundException("Room not found");
        }

        Room room = optional.get();

        return new RoomResponse(room);
    }

    @Override
    public Room findRoomById(int roomId) {
        return roomRepository.findById(roomId).orElseThrow(() -> new NotFoundException("Room not found"));
    }

    @Override
    public List<RoomResponse> findRoomByRoomName(String roomName) {
        return roomRepository
                .findRoomsByRoomNameContainingIgnoreCaseAndDeletedIsFalse(
                        roomName
                )
                .stream()
                .map(RoomResponse::new)
                .toList();
    }
}
