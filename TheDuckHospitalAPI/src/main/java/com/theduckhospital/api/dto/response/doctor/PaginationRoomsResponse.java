package com.theduckhospital.api.dto.response.doctor;

import com.theduckhospital.api.dto.response.admin.RoomResponse;
import lombok.Data;

import java.util.List;

@Data
public class PaginationRoomsResponse {
    private List<RoomResponse> rooms;
    private long total;
    private int page;
    private int limit;

    public PaginationRoomsResponse(List<RoomResponse> rooms, long total, int page, int limit) {
        this.rooms = rooms;
        this.total = total;
        this.page = page;
        this.limit = limit;
    }
}
