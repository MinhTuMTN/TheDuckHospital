package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.dto.request.CreateRoomRequest;
import com.theduckhospital.api.dto.response.RoomResponse;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Room;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.RoomRepository;
import com.theduckhospital.api.services.IDepartmentServices;
import com.theduckhospital.api.services.IRoomServices;
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
    public List<RoomResponse> getAllRoomsDeleted() {
        List<RoomResponse> responses = new ArrayList<>();

        for (Room room : roomRepository.findAllByOrderByDeleted()) {
            responses.add(new RoomResponse(room));
        }

        return responses;
    }
}
