package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.admin.CreateServicesRequest;
import com.theduckhospital.api.entity.MedicalService;

public interface IMedicalServiceServices {
    MedicalService createService(CreateServicesRequest request);
    MedicalService getMedicalServiceById(int serviceId);
}
