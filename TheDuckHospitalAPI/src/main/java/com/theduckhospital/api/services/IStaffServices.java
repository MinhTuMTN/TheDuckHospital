package com.theduckhospital.api.services;

import com.theduckhospital.api.constant.Role;
import com.theduckhospital.api.dto.request.admin.CreateStaffRequest;
import com.theduckhospital.api.dto.request.admin.UpdateStaffRequest;
import com.theduckhospital.api.dto.response.admin.FilteredStaffsResponse;
import com.theduckhospital.api.dto.response.admin.StaffResponse;
import com.theduckhospital.api.entity.Staff;

import java.util.List;
import java.util.Map;
import java.util.UUID;


public interface IStaffServices {
    Map<String, Object> createStaff(CreateStaffRequest request);

    Staff updateStaff(UUID staffId, UpdateStaffRequest request);

    List<StaffResponse> getAllStaffs();

    boolean deleteStaff(UUID staffId);

    StaffResponse restoreStaff(UUID staffId);

    StaffResponse getStaffById(UUID staffId);

    FilteredStaffsResponse getPaginationFilteredStaffs(
            String search,
            int page,
            int limit,
            List<Role> staffRole,
            List<Boolean> staffStatus
    );
}
