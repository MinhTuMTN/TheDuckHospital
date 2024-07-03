package com.theduckhospital.api.services;

import com.theduckhospital.api.constant.Role;
import com.theduckhospital.api.dto.request.admin.CreateStaffRequest;
import com.theduckhospital.api.dto.request.admin.UpdateStaffRequest;
import com.theduckhospital.api.dto.response.admin.FilteredStaffsResponse;
import com.theduckhospital.api.dto.response.admin.StaffResponse;
import com.theduckhospital.api.entity.Staff;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;


public interface IStaffServices {
    Map<String, Object> createStaff(CreateStaffRequest request);

    void updateAvatarAsync(UUID staffId, Object avatar);

    Staff updateStaff(UUID staffId, UpdateStaffRequest request) throws IOException;

    List<StaffResponse> getAllStaffs();

    boolean deleteStaff(UUID staffId);

    StaffResponse restoreStaff(UUID staffId);

    StaffResponse getStaffById(UUID staffId);

    FilteredStaffsResponse getPaginationFilteredStaffs(
            String search,
            int page,
            int limit,
            List<Role> staffRole,
            List<Integer> departmentIds,
            List<Boolean> staffStatus
    );
}
