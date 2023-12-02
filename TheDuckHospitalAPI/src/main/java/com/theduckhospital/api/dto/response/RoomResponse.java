package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.entity.Room;
import lombok.Data;

@Data
public class RoomResponse {
    private int roomId;
    private String roomName;
    private String description;
    private int departmentId;
    private String departmentName;
    private boolean deleted;

    public RoomResponse(Room room) {
        this.roomId = room.getRoomId();
        this.roomName = room.getRoomName();
        this.description = room.getDescription();
        this.departmentId = room.getDepartment().getDepartmentId();
        this.departmentName = room.getDepartment().getDepartmentName();
        this.deleted = room.isDeleted();
    }
}
