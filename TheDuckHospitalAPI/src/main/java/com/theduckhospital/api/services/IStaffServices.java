package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.CreateStaffRequest;
import com.theduckhospital.api.entity.Staff;

import java.util.Map;


public interface IStaffServices {
    Map<String, Object> createStaff(CreateStaffRequest request);
}
