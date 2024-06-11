package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.RoomType;
import com.theduckhospital.api.constant.ServiceType;
import com.theduckhospital.api.dto.request.admin.CreateRoomRequest;
import com.theduckhospital.api.dto.response.admin.FilteredRoomsResponse;
import com.theduckhospital.api.dto.response.admin.RoomResponse;
import com.theduckhospital.api.dto.response.doctor.PaginationRoomsResponse;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.MedicalService;
import com.theduckhospital.api.entity.Room;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.DepartmentRepository;
import com.theduckhospital.api.repository.DoctorScheduleRepository;
import com.theduckhospital.api.repository.MedicalServiceRepository;
import com.theduckhospital.api.repository.RoomRepository;
import com.theduckhospital.api.services.IDepartmentServices;
import com.theduckhospital.api.services.IDoctorServices;
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
    private final DoctorScheduleRepository doctorScheduleRepository;
    private final MedicalServiceRepository medicalServiceRepository;
    private final DepartmentRepository departmentRepository;
    private final IDepartmentServices departmentServices;
    private final IDoctorServices doctorServices;

    public RoomServicesImpl(RoomRepository roomRepository,
                            IDepartmentServices departmentServices,
                            DoctorScheduleRepository doctorScheduleRepository,
                            MedicalServiceRepository medicalServiceRepository, IDoctorServices doctorServices,
                            DepartmentRepository departmentRepository
    ) {
        this.roomRepository = roomRepository;
        this.doctorScheduleRepository = doctorScheduleRepository;
        this.departmentServices = departmentServices;
        this.medicalServiceRepository = medicalServiceRepository;
        this.doctorServices = doctorServices;
        this.departmentRepository = departmentRepository;
    }
    @Override
    public RoomResponse createRoom(CreateRoomRequest request) {
        boolean isLaboratoryRoom = request.getRoomType() == RoomType.LABORATORY_ROOM_ADMISSION
                || request.getRoomType() == RoomType.LABORATORY_ROOM_NORMAL;
        Department department = null;
        if (request.getDepartmentId() != null && !isLaboratoryRoom)
            department = departmentServices.getDepartmentById(request.getDepartmentId());

        MedicalService medicalService = null;
        if (request.getMedicalServiceId() != null && isLaboratoryRoom) {
            Optional<MedicalService> optional = medicalServiceRepository.findById(request.getMedicalServiceId());

            if (optional.isEmpty() || optional.get().isDeleted()) {
                throw new NotFoundException("Medical service not found");
            }

            medicalService = optional.get();
            if (medicalService.getServiceType() != ServiceType.MedicalTest) {
                throw new BadRequestException("Medical service is not medical test");
            }
        }


        Room room = new Room();
        room.setRoomName(request.getRoomName());
        room.setDescription(request.getDescription());
        room.setDepartment(department);
        room.setRoomType(request.getRoomType());
        room.setMedicalService(medicalService);
        room.setDeleted(false);

        return new RoomResponse(roomRepository.save(room));
    }

    @Override
    public RoomResponse updateRoom(int roomId, CreateRoomRequest request) {
        Optional<Room> optional = roomRepository.findById(roomId);
        if (optional.isEmpty() || optional.get().isDeleted()) {
            throw new NotFoundException("Room not found");
        }
        RoomType roomType = request.getRoomType() == null ? optional.get().getRoomType() : request.getRoomType();
        boolean isLabRoom = roomType == RoomType.LABORATORY_ROOM_ADMISSION
                || request.getRoomType() == RoomType.LABORATORY_ROOM_NORMAL;
        Department department = null;
        if (request.getDepartmentId() != null && !isLabRoom)
            department = departmentServices.getDepartmentById(request.getDepartmentId());

        MedicalService medicalService = null;
        if (request.getMedicalServiceId() != null && isLabRoom) {
            Optional<MedicalService> optionalMedicalService = medicalServiceRepository.findById(request.getMedicalServiceId());

            if (optionalMedicalService.isEmpty() || optionalMedicalService.get().isDeleted()) {
                throw new NotFoundException("Medical service not found");
            }

            medicalService = optionalMedicalService.get();
            if (medicalService.getServiceType() != ServiceType.MedicalTest) {
                throw new BadRequestException("Medical service is not medical test");
            }
        }

        Room room = optional.get();
        room.setRoomName(request.getRoomName() == null ?
                room.getRoomName() :
                request.getRoomName());
        room.setDescription(request.getDescription() == null ?
                room.getDescription() :
                request.getDescription());
        room.setDepartment(department == null && !isLabRoom ?
                room.getDepartment() :
                department
        );
        room.setRoomType(roomType);
        room.setMedicalService(medicalService == null && isLabRoom ?
                room.getMedicalService() :
                medicalService
        );

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

    @Override
    public List<Room> getRoomsByType(List<RoomType> roomTypes) {
        return roomRepository.findByRoomTypeInAndDeletedIsFalse(roomTypes);
    }

    @Override
    public void saveRoom(Room room) {
        roomRepository.save(room);
    }
}
