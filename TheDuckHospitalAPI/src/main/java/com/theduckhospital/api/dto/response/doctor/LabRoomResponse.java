package com.theduckhospital.api.dto.response.doctor;

import com.theduckhospital.api.constant.RoomType;
import com.theduckhospital.api.entity.Room;
import lombok.Data;

@Data
public class LabRoomResponse {
    private int roomId;
    private String roomName;
    private RoomType roomType;
    private boolean isDeleted;
    private String serviceName;
    private int current;
    private int total;

    public LabRoomResponse(Room room) {
        this.roomId = room.getRoomId();
        this.roomName = room.getRoomName();
        this.roomType = room.getRoomType();
        this.isDeleted = room.isDeleted();
        this.serviceName = room.getMedicalService().getServiceName();
        this.current = room.getMedicalTestQueueNumber();
        this.total = room.getMedicalTestQueueNumberMax();
    }
}
