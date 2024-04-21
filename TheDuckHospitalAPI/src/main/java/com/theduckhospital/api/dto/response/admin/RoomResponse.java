package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Room;
import lombok.Data;

@Data
public class RoomResponse {
    private int roomId;
    private String roomName;
    private String description;
    private Integer departmentId;
    private String departmentName;
    private Department department;
    private boolean deleted;

    public RoomResponse(Room room) {
        this.roomId = room.getRoomId();
        this.roomName = room.getRoomName();
        this.description = room.getDescription();
        this.departmentId = room.getDepartment() == null ? null : room.getDepartment().getDepartmentId();
        this.departmentName = room.getDepartment() == null ? null : room.getDepartment().getDepartmentName();
        this.department = room.getDepartment();
        this.deleted = room.isDeleted();
    }
}
