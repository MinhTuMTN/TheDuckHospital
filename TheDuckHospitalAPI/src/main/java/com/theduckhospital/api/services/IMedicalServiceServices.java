package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.admin.CreateServicesRequest;
import com.theduckhospital.api.dto.request.admin.UpdateServiceRequest;
import com.theduckhospital.api.dto.response.admin.FilteredMedicalServicesResponse;
import com.theduckhospital.api.entity.MedicalService;

public interface IMedicalServiceServices {
    MedicalService createService(CreateServicesRequest request);

    boolean deleteService(int serviceId);

    MedicalService restoreService(int serviceId);

    MedicalService getMedicalServiceById(int serviceId);

    FilteredMedicalServicesResponse getPaginationFilteredServices(
            String search,
            int page,
            int limit
    );

    MedicalService updateMedicalService(int serviceId, UpdateServiceRequest request);
}
