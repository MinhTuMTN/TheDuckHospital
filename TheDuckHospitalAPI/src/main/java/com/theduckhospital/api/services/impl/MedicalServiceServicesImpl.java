package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.ServiceType;
import com.theduckhospital.api.dto.request.admin.CreateServicesRequest;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.MedicalService;
import com.theduckhospital.api.error.StatusCodeException;
import com.theduckhospital.api.repository.MedicalServiceRepository;
import com.theduckhospital.api.services.IDepartmentServices;
import com.theduckhospital.api.services.IMedicalServiceServices;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

@Service
public class MedicalServiceServicesImpl implements IMedicalServiceServices {
    private final IDepartmentServices departmentServices;
    private final MedicalServiceRepository medicalServiceRepository;

    public MedicalServiceServicesImpl(
            IDepartmentServices departmentServices,
            MedicalServiceRepository medicalServiceRepository
    ) {
        this.departmentServices = departmentServices;
        this.medicalServiceRepository = medicalServiceRepository;
    }

    @Override
    public MedicalService createService(CreateServicesRequest request) {
        Department department = departmentServices.getDepartmentById(request.getDepartmentId());
        
        if (request.getServiceType() == ServiceType.MedicalExamination
                && department.getMedicalServices().stream().anyMatch(
                medicalService -> medicalService.getServiceType() == ServiceType.MedicalExamination
        )) {
            throw new StatusCodeException("Department already has a medical examination service", 409);
        };

        MedicalService medicalService = getMedicalService(request, department);

        return medicalServiceRepository.save(medicalService);
    }

    @Override
    public MedicalService getMedicalServiceById(int serviceId) {
        return medicalServiceRepository
                .findById(serviceId)
                .orElseThrow(() ->
                        new StatusCodeException("Medical service not found", 404)
                );
    }

    @NotNull
    private static MedicalService getMedicalService(CreateServicesRequest request, Department department) {
        MedicalService medicalService = new MedicalService();
        medicalService.setPrice(request.getPrice());
        medicalService.setDepartment(department);
        medicalService.setDescription(department.getDescription());
        medicalService.setServiceType(request.getServiceType());

        String serviceName = request.getServiceName().trim();
        if (request.getServiceType() == ServiceType.MedicalExamination && request.getServiceName().trim().isEmpty()) {
            serviceName = "Khám " + department.getDepartmentName().replace("Khoa", "").trim();
        }
        medicalService.setServiceName(serviceName);
        return medicalService;
    }
}
