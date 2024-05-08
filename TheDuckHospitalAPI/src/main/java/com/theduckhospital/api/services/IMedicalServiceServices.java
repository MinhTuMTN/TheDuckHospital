package com.theduckhospital.api.services;

import com.theduckhospital.api.constant.ServiceType;
import com.theduckhospital.api.dto.request.admin.CreateServicesRequest;
import com.theduckhospital.api.dto.request.admin.UpdateServiceRequest;
import com.theduckhospital.api.dto.response.admin.FilteredMedicalServicesResponse;
import com.theduckhospital.api.entity.MedicalService;

import java.util.List;

public interface IMedicalServiceServices {
    MedicalService createService(CreateServicesRequest request);

    boolean deleteService(int serviceId);

    MedicalService restoreService(int serviceId);

    MedicalService getMedicalServiceById(int serviceId);

    FilteredMedicalServicesResponse getPaginationFilteredServices(
            String search,
            int page,
            int limit,
            List<ServiceType> serviceTypes
    );

    MedicalService updateMedicalService(int serviceId, UpdateServiceRequest request);
    List<MedicalService> doctorGetAllMedicalTests();
    MedicalService getMedicalServiceByIdAndServiceType(int serviceId, ServiceType serviceType);
}
