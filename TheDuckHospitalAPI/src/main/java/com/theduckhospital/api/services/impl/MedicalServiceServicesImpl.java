package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.ServiceType;
import com.theduckhospital.api.dto.request.admin.CreateServicesRequest;
import com.theduckhospital.api.dto.request.admin.UpdateServiceRequest;
import com.theduckhospital.api.dto.response.admin.FilteredMedicalServicesResponse;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.MedicalService;
import com.theduckhospital.api.error.StatusCodeException;
import com.theduckhospital.api.repository.MedicalServiceRepository;
import com.theduckhospital.api.services.IDepartmentServices;
import com.theduckhospital.api.services.IMedicalServiceServices;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
    public boolean deleteService(int serviceId) {
        MedicalService service = getMedicalServiceById(serviceId);
        service.setDeleted(true);
        medicalServiceRepository.save(service);

        return true;
    }

    @Override
    public MedicalService restoreService(int serviceId) {
        MedicalService service = getMedicalServiceById(serviceId);
        service.setDeleted(false);
        return medicalServiceRepository.save(service);
    }

    @Override
    public MedicalService getMedicalServiceById(int serviceId) {
        return medicalServiceRepository
                .findById(serviceId)
                .orElseThrow(() ->
                        new StatusCodeException("Medical service not found", 404)
                );
    }

    @Override
    public FilteredMedicalServicesResponse getPaginationMedicalServicesDeleted(int page, int limit) {
        Pageable pageable = PageRequest.of(page, limit);
        Page<MedicalService> medicalServicePage = medicalServiceRepository.findPaginationByOrderByDeleted(pageable);

        List<MedicalService> filteredMedicalServices = new ArrayList<>();

        for (MedicalService medicalService : medicalServicePage.getContent()) {
            filteredMedicalServices.add(medicalService);
        }

        List<MedicalService> medicalServices = medicalServiceRepository.findAll();

        return new FilteredMedicalServicesResponse(filteredMedicalServices, medicalServices.size(), page, limit);
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

    @Override
    public MedicalService updateMedicalService(int serviceId, UpdateServiceRequest request) {
        MedicalService service = getMedicalServiceById(serviceId);

        service.setPrice(request.getPrice());

        return medicalServiceRepository.save(service);
    }
}