package com.theduckhospital.api.repository;

import com.theduckhospital.api.constant.RoomType;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.MedicalService;
import com.theduckhospital.api.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
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
    List<Room> findByDepartmentAndRoomTypeAndDeletedIsFalse(Department department, RoomType roomType);
    List<Room> findByDepartmentAndRoomTypeInAndDeletedIsFalse(Department department, List<RoomType> roomType);
    long countByDepartmentAndDeletedIsFalse(Department department);
    List<Room> findAllByOrderByDeletedAscRoomNameAsc();
    Page<Room> findByRoomNameContainingAndRoomTypeInAndDeletedInOrderByRoomName(
            String roomName,
            Collection<RoomType> roomType,
            Collection<Boolean> deleted,
            Pageable pageable
    );
    List<Room> findByRoomTypeInAndDeletedIsFalse(List<RoomType> roomType);

    @Query("SELECT r.roomType, COUNT(r), SUM(r.capacity), SUM(r.beingUsed) " +
            "FROM Room r " +
            "WHERE r.department = :department " +
            "AND r.deleted = false " +
            "AND r.roomType IN :roomTypes " +
            "GROUP BY r.roomType"
    )
    List<Object[]> getRoomStatistic(Department department, Collection<RoomType> roomTypes);
}
