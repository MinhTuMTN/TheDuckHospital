package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.CreateServicesRequest;
import com.theduckhospital.api.entity.MedicalService;

public interface IMedicalServiceServices {
    MedicalService createService(CreateServicesRequest request);
}
