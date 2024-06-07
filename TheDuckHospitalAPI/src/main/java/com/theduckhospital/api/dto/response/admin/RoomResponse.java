package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.constant.RoomType;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.MedicalService;
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
    private RoomType roomType;
    private String serviceName;
    private Integer serviceId;
    private boolean deleted;

    public RoomResponse(Room room) {
        this.roomId = room.getRoomId();
        this.roomName = room.getRoomName();
        this.description = room.getDescription();
        this.departmentId = room.getDepartment() == null ? null : room.getDepartment().getDepartmentId();
        this.departmentName = room.getDepartment() == null ? null : room.getDepartment().getDepartmentName();
        this.department = room.getDepartment();
        this.deleted = room.isDeleted();
        this.roomType = room.getRoomType();

        boolean isLaboratoryRoom = room.getRoomType() == RoomType.LABORATORY_ROOM_ADMISSION
                || room.getRoomType() == RoomType.LABORATORY_ROOM_NORMAL;
        if (isLaboratoryRoom) {
            MedicalService medicalService = room.getMedicalService();
            this.serviceName = medicalService == null ? null : medicalService.getServiceName();
            this.serviceId = medicalService == null ? null : medicalService.getServiceId();
        }
    }
}
