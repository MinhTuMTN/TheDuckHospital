package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    Page<Room> findPaginationByOrderByDeleted(Pageable pageable);
    List<Room> findAllByOrderByDeleted();
}
