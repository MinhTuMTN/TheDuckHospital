package com.theduckhospital.api.dto.response.admin;

import lombok.Data;

import java.util.List;

@Data
public class FilteredRoomsResponse {
    private List<RoomResponse> rooms;
    private int total;
    private int page;
    private int limit;

    public FilteredRoomsResponse(List<RoomResponse> rooms, int total, int page, int limit) {
        this.rooms = rooms;
        this.total = total;
        this.page = page;
        this.limit = limit;
    }
}
