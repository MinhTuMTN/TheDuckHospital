package com.theduckhospital.api.dto.request.admin;

import com.theduckhospital.api.constant.RoomType;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateRoomRequest {
    @NotBlank(message = "Room name is required")
    private String roomName;
    private String description;
    private Integer departmentId;
    private RoomType roomType;
    private Integer medicalServiceId;
}
