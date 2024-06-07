package com.theduckhospital.api.repository;

import com.theduckhospital.api.constant.RoomType;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.MedicalService;
import com.theduckhospital.api.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    @Query("SELECT r FROM Room r " +
            "WHERE r.medicalService = :medicalService " +
            "AND r.roomType = :roomType " +
            "AND r.deleted = false " +
            "ORDER BY r.medicalTestQueueNumberMax ASC")
    Page<Room> findLaboratoryRoom(
            MedicalService medicalService,
            RoomType roomType,
            Pageable pageable
    );
    Optional<Room> findRoomByRoomIdAndDepartmentAndDeletedIsFalse(int roomId, Department department);
    Page<Room> findPaginationByOrderByDeleted(Pageable pageable);
    Page<Room> findByDepartmentAndDeletedIsFalse(Department department, Pageable pageable);
    long countByDepartmentAndDeletedIsFalse(Department department);
    List<Room> findAllByOrderByDeletedAscRoomNameAsc();
    List<Room> findByRoomNameContainingOrDepartmentInOrderByRoomName(String roomName, List<Department> departments);
}
