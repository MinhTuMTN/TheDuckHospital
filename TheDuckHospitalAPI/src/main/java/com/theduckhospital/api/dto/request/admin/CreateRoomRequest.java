package com.theduckhospital.api.dto.request.admin;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateRoomRequest {
    @NotBlank(message = "Room name is required")
    private String roomName;
    private String description;
    private Integer departmentId;
}
