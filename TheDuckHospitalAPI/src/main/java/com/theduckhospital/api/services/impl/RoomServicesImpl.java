package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.RoomType;
import com.theduckhospital.api.constant.ServiceType;
import com.theduckhospital.api.dto.request.admin.CreateRoomRequest;
import com.theduckhospital.api.dto.response.admin.FilteredRoomsResponse;
import com.theduckhospital.api.dto.response.admin.RoomResponse;
import com.theduckhospital.api.dto.response.doctor.PaginationRoomsResponse;
import com.theduckhospital.api.dto.response.nurse.RoomStatisticResponse;
import com.theduckhospital.api.dto.response.nurse.TreatmentRoomDetailsResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.MedicalServiceRepository;
import com.theduckhospital.api.repository.RoomRepository;
import com.theduckhospital.api.services.IDepartmentServices;
import com.theduckhospital.api.services.IDoctorServices;
import com.theduckhospital.api.services.INurseServices;
import com.theduckhospital.api.services.IRoomServices;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoomServicesImpl implements IRoomServices {
    private final RoomRepository roomRepository;
    private final MedicalServiceRepository medicalServiceRepository;
    private final IDepartmentServices departmentServices;
    private final IDoctorServices doctorServices;
    private final INurseServices nurseServices;

    public RoomServicesImpl(RoomRepository roomRepository,
                            IDepartmentServices departmentServices,
                            MedicalServiceRepository medicalServiceRepository,
                            IDoctorServices doctorServices,
                            INurseServices nurseServices
    ) {
        this.roomRepository = roomRepository;
        this.departmentServices = departmentServices;
        this.medicalServiceRepository = medicalServiceRepository;
        this.doctorServices = doctorServices;
        this.nurseServices = nurseServices;
    }
    @Override
    public RoomResponse createRoom(CreateRoomRequest request) {
        System.out.println(request);
        boolean isLaboratoryRoom = request.getRoomType() == RoomType.LABORATORY_ROOM_ADMISSION
                || request.getRoomType() == RoomType.LABORATORY_ROOM_NORMAL;

        boolean isTreatmentRoom = request.getRoomType() == RoomType.TREATMENT_ROOM_STANDARD
                || request.getRoomType() == RoomType.TREATMENT_ROOM_VIP;
        Department department = null;
        if (request.getDepartmentId() != null && !isLaboratoryRoom)
            department = departmentServices.getDepartmentById(request.getDepartmentId());

        MedicalService medicalService = isLaboratoryRoom
                ? getMedicalTestService(request.getMedicalServiceId())
                : null;

        int capacity = 0;
        if (isTreatmentRoom) {
            if (request.getCapacity() < 1) {
                throw new BadRequestException("Capacity must be greater than 0");
            }

            capacity = request.getCapacity();
        }


        Room room = new Room();
        room.setRoomName(request.getRoomName());
        room.setDescription(request.getDescription());
        room.setDepartment(department);
        room.setRoomType(request.getRoomType());
        room.setMedicalService(medicalService);
        room.setCapacity(capacity);
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
        boolean isTreatmentRoom = roomType == RoomType.TREATMENT_ROOM_STANDARD
                || request.getRoomType() == RoomType.TREATMENT_ROOM_VIP;

        Department department = null;
        if (request.getDepartmentId() != null && !isLabRoom)
            department = departmentServices.getDepartmentById(request.getDepartmentId());

        MedicalService medicalService = isLabRoom && request.getMedicalServiceId() != null
                ? getMedicalTestService(request.getMedicalServiceId())
                : null;

        if (request.getCapacity() != null && request.getCapacity() < 1 && isTreatmentRoom) {
            throw new BadRequestException("Capacity must be greater than 0");
        }
        Integer capacity = isTreatmentRoom && request.getCapacity() != null
                ? request.getCapacity()
                : null;
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
        room.setCapacity(capacity == null && isTreatmentRoom ?
                room.getCapacity() :
                capacity
        );
        room.setRoomType(roomType);
        room.setMedicalService(medicalService == null && isLabRoom ?
                room.getMedicalService() :
                medicalService
        );

        return new RoomResponse(roomRepository.save(room));
    }

    private MedicalService getMedicalTestService(Integer medicalServiceId) {
        if (medicalServiceId == null) {
            throw new BadRequestException("Medical service id is required");
        }
        Optional<MedicalService> optional = medicalServiceRepository.findById(medicalServiceId);
        if (optional.isEmpty() || optional.get().isDeleted()) {
            throw new NotFoundException("Medical service not found");
        }

        MedicalService medicalService = optional.get();
        if (medicalService.getServiceType() != ServiceType.MedicalTest) {
            throw new BadRequestException("Medical service is not medical test");
        }

        return medicalService;
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
            int limit,
            List<RoomType> roomTypes,
            List<Boolean> statuses
    ) {
        if (roomTypes == null || roomTypes.isEmpty()) {
            roomTypes = List.of(RoomType.values());
        }
        if (statuses == null || statuses.isEmpty()) {
            statuses = List.of(true, false);
        }
//        List<Department> departments = departmentRepository.findByDepartmentNameContaining(search);


        Pageable pageable = PageRequest.of(page, limit);
        Page<Room> roomPage = roomRepository
                .findByRoomNameContainingAndRoomTypeInAndDeletedInOrderByRoomName(
                        search,
                        roomTypes,
                        statuses,
                        pageable
                );
        List<RoomResponse> response = new ArrayList<>();
        for (Room room : roomPage.getContent()) {
            response.add(new RoomResponse(room));
        }

        return new FilteredRoomsResponse(response, (int) roomPage.getTotalElements(), page, limit);
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

        List<Room> rooms = roomRepository.findByDepartmentAndRoomTypeAndDeletedIsFalse(department, RoomType.EXAMINATION_ROOM);

//        return department.getRooms()
//                .stream()
//                .filter(room -> !room.isDeleted()
//                        && room.getRoomType() == RoomType.EXAMINATION_ROOM
//                ).toList();
        return rooms;
    }

    @Override
    public List<Room> getTreatmentRoomsDepartment(String authorization) {
        Doctor headDoctor = doctorServices.getDoctorByToken(authorization);
        if (!headDoctor.isHeadOfDepartment()) {
            throw new RuntimeException("You are not head of department");
        }

        Department department = headDoctor.getDepartment();

        List<RoomType> roomTypes = Arrays.asList(RoomType.TREATMENT_ROOM_STANDARD, RoomType.TREATMENT_ROOM_VIP);
        List<Room> rooms = roomRepository.findByDepartmentAndRoomTypeInAndDeletedIsFalse(
                department,
                roomTypes
        );

//        return department.getRooms()
//                .stream()
//                .filter(room -> !room.isDeleted()
//                        && (room.getRoomType() == RoomType.TREATMENT_ROOM_STANDARD
//                        || room.getRoomType() == RoomType.TREATMENT_ROOM_VIP)
//                ).toList();
        return rooms;
    }

    @Override
    public PaginationRoomsResponse getPaginationExaminationRooms(
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
        Page<Room> roomPage = roomRepository.findByDepartmentAndRoomTypeInAndDeletedIsFalseOrderByRoomName(
                department,
                List.of(RoomType.EXAMINATION_ROOM),
                pageable
        );

        List<RoomResponse> response = new ArrayList<>();
        for (Room room : roomPage.getContent()) {
            response.add(new RoomResponse(room));
        }

        return new PaginationRoomsResponse(
                response,
                roomRepository.countByDepartmentAndRoomTypeInAndDeletedIsFalse(
                        department,
                        List.of(RoomType.EXAMINATION_ROOM)
                ),
                page,
                limit,
                !response.isEmpty()
        );
    }

    @Override
    public PaginationRoomsResponse getPaginationTreatmentRooms(
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
        Page<Room> roomPage = roomRepository.findByDepartmentAndRoomTypeInAndDeletedIsFalseOrderByRoomName(
                department,
                Arrays.asList(RoomType.TREATMENT_ROOM_STANDARD, RoomType.TREATMENT_ROOM_VIP),
                pageable
        );

        long numberOfExaminationRooms = roomRepository.countByDepartmentAndRoomTypeInAndDeletedIsFalse(
                department,
                List.of(RoomType.EXAMINATION_ROOM)
        );

        List<RoomResponse> response = new ArrayList<>();
        for (Room room : roomPage.getContent()) {
            response.add(new RoomResponse(room));
        }

        return new PaginationRoomsResponse(
                response,
                roomRepository.countByDepartmentAndRoomTypeInAndDeletedIsFalse(
                        department,
                        Arrays.asList(RoomType.TREATMENT_ROOM_STANDARD, RoomType.TREATMENT_ROOM_VIP)
                ),
                page,
                limit,
                numberOfExaminationRooms != 0
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

    @Override
    public Map<String, RoomStatisticResponse> getRoomStatistic(String authorization) {
        Nurse nurse = nurseServices.getNurseByToken(authorization);
        Department department = nurse.getDepartment();
        if (department == null) {
            throw new RuntimeException("Nurse does not belong to any department");
        }

        List<RoomType> roomTypes = List.of(
                RoomType.TREATMENT_ROOM_STANDARD,
                RoomType.TREATMENT_ROOM_VIP
        );

        List<Object[]> roomStatistics = roomRepository.getRoomStatistic(department, roomTypes);
        Map<String, RoomStatisticResponse> responses = new HashMap<>();
        for (Object[] statistic : roomStatistics) {
            RoomStatisticResponse response = new RoomStatisticResponse();
            response.setRoomType((RoomType) statistic[0]);
            response.setTotalRooms((long) statistic[1]);
            response.setTotalBed((long) statistic[2]);
            response.setTotalBedUsed((long) statistic[3]);

            responses.put(response
                    .getRoomType()
                    .name()
                    .split("_")[2]
                    .toLowerCase(),
                    response
            );
        }

        return responses;
    }

    @Override
    public List<TreatmentRoomDetailsResponse> getTreatmentRoomDetails(
            String authorization,
            RoomType roomType
    ) {
        if (roomType != RoomType.TREATMENT_ROOM_STANDARD
                && roomType != RoomType.TREATMENT_ROOM_VIP
        ) {
            throw new BadRequestException("Room type is not treatment room");
        }

        Nurse nurse = nurseServices.getNurseByToken(authorization);
        Department department = nurse.getDepartment();
        if (department == null) {
            throw new RuntimeException("Nurse does not belong to any department");
        }

        List<Room> rooms = roomRepository
                .findByDepartmentAndRoomTypeAndDeletedIsFalse(
                        department,
                        roomType
                );
        return rooms.stream()
                .map(TreatmentRoomDetailsResponse::new)
                .toList();
    }
}
