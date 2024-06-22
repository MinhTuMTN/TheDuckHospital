package com.theduckhospital.api.dto.response.nurse;

import com.theduckhospital.api.constant.RoomType;
import com.theduckhospital.api.entity.Room;
import lombok.Data;

@Data
public class TreatmentRoomDetailsResponse {
    private int roomId;
    private String roomName;
    private String roomDescription;
    private int capacity;
    private int beingUsed;
    private RoomType roomType;

    public TreatmentRoomDetailsResponse(Room room) {
        this.roomId = room.getRoomId();
        this.roomName = room.getRoomName();
        this.roomDescription = room.getDescription();
        this.capacity = room.getCapacity();
        this.beingUsed = room.getBeingUsed();
        this.roomType = room.getRoomType();
    }
}
