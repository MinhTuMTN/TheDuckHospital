package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    List<Room> findAllByOrderByDeleted();
}
