package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.admin.CreateStaffRequest;

import java.util.Map;


public interface IStaffServices {
    Map<String, Object> createStaff(CreateStaffRequest request);
}
