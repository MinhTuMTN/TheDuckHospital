package com.theduckhospital.api.dto.response.nurse;

import com.theduckhospital.api.constant.RoomType;
import lombok.Data;

@Data
public class RoomStatisticResponse {
    private RoomType roomType;
    private long totalRooms;
    private long totalBed;
    private long totalBedUsed;
}
