package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.RoomType;
import com.theduckhospital.api.dto.request.admin.CreateRoomRequest;
import com.theduckhospital.api.dto.response.admin.FilteredRoomsResponse;
import com.theduckhospital.api.dto.response.admin.RoomResponse;
import com.theduckhospital.api.dto.response.doctor.PaginationRoomsResponse;
import com.theduckhospital.api.dto.response.nurse.NurseDoctorScheduleItemResponse;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.Room;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.DepartmentRepository;
import com.theduckhospital.api.repository.DoctorScheduleRepository;
import com.theduckhospital.api.repository.RoomRepository;
import com.theduckhospital.api.services.IDepartmentServices;
import com.theduckhospital.api.services.IDoctorServices;
import com.theduckhospital.api.services.IRoomServices;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RoomServicesImpl implements IRoomServices {
    private final RoomRepository roomRepository;
    private final DoctorScheduleRepository doctorScheduleRepository;
    private final DepartmentRepository departmentRepository;
    private final IDepartmentServices departmentServices;
    private final IDoctorServices doctorServices;
    @Value("${settings.date}")
    private String appToday;

    public RoomServicesImpl(RoomRepository roomRepository,
                            IDepartmentServices departmentServices,
                            DoctorScheduleRepository doctorScheduleRepository,
                            IDoctorServices doctorServices,
                            DepartmentRepository departmentRepository
    ) {
        this.roomRepository = roomRepository;
        this.doctorScheduleRepository = doctorScheduleRepository;
        this.departmentServices = departmentServices;
        this.doctorServices = doctorServices;
        this.departmentRepository = departmentRepository;
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
        room.setRoomType(request.getRoomType());
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
        room.setRoomType(request.getRoomType() == null ?
                room.getRoomType() :
                request.getRoomType());

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
    public FilteredRoomsResponse getPaginationFilteredRooms(
            String search,
            int page,
            int limit
    ) {
        List<Department> departments = departmentRepository.findByDepartmentNameContaining(search);

        List<Room> rooms = roomRepository.findByRoomNameContainingOrDepartmentInOrderByRoomName(search, departments);

        Pageable pageable = PageRequest.of(page, limit);

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), rooms.size());
        List<Room> pageContent = rooms.subList(start, end);

        List<RoomResponse> response = new ArrayList<>();
        for (Room room : pageContent) {
            response.add(new RoomResponse(room));
        }

        return new FilteredRoomsResponse(response, rooms.size(), page, limit);
    }

    @Override
    public List<RoomResponse> getAllRoomsDeleted() {
        List<RoomResponse> responses = new ArrayList<>();

        for (Room room : roomRepository.findAllByOrderByDeletedAscRoomNameAsc()) {
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

    @Override
    public List<NurseDoctorScheduleItemResponse> getTodayDoctorSchedules(int roomId) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date today = format.parse(appToday);

        Room room = findRoomById(roomId);

        return doctorScheduleRepository.findByRoomAndDateAndDeletedIsFalse(
                room,
                today
        ).stream().map(NurseDoctorScheduleItemResponse::new).toList();
    }

    @Override
    public List<Room> getExaminationRoomsDepartment(String authorization) {
        Doctor headDoctor = doctorServices.getDoctorByToken(authorization);
        if (!headDoctor.isHeadOfDepartment()) {
            throw new RuntimeException("You are not head of department");
        }

        Department department = headDoctor.getDepartment();

        return department.getRooms()
                .stream()
                .filter(room -> !room.isDeleted()
                        && room.getRoomType() == RoomType.EXAMINATION_ROOM
                ).toList();
    }

    @Override
    public PaginationRoomsResponse getPaginationRooms(
            String authorization,
            int page,
            int limit
    ) {
        Doctor headDoctor = doctorServices.getDoctorByToken(authorization);
        if (!headDoctor.isHeadOfDepartment()) {
            throw new RuntimeException("You are not head of department");
        }

        Department department = headDoctor.getDepartment();

        Pageable pageable = PageRequest.of(page, limit);
        Page<Room> roomPage = roomRepository.findByDepartmentAndDeletedIsFalse(department, pageable);

        List<RoomResponse> response = new ArrayList<>();
        for (Room room : roomPage.getContent()) {
            response.add(new RoomResponse(room));
        }

        return new PaginationRoomsResponse(
                response,
                roomRepository.countByDepartmentAndDeletedIsFalse(department),
                page,
                limit
        );
    }

    @Override
    public List<RoomType> getRoomTypes() {
        return List.of(RoomType.values());
    }
}
