package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.ServiceType;
import com.theduckhospital.api.dto.request.admin.CreateServicesRequest;
import com.theduckhospital.api.dto.request.admin.UpdateServiceRequest;
import com.theduckhospital.api.dto.response.admin.FilteredMedicalServicesResponse;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.MedicalService;
import com.theduckhospital.api.error.StatusCodeException;
import com.theduckhospital.api.repository.DepartmentRepository;
import com.theduckhospital.api.repository.MedicalServiceRepository;
import com.theduckhospital.api.services.IDepartmentServices;
import com.theduckhospital.api.services.IMedicalServiceServices;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalServiceServicesImpl implements IMedicalServiceServices {
    private final IDepartmentServices departmentServices;
    private final MedicalServiceRepository medicalServiceRepository;
    private final DepartmentRepository departmentRepository;

    public MedicalServiceServicesImpl(
            IDepartmentServices departmentServices,
            MedicalServiceRepository medicalServiceRepository,
            DepartmentRepository departmentRepository
    ) {
        this.departmentServices = departmentServices;
        this.medicalServiceRepository = medicalServiceRepository;
        this.departmentRepository = departmentRepository;
    }

    @Override
    public MedicalService createService(CreateServicesRequest request) {
        Department department = new Department();
        if(request.getServiceType() == ServiceType.MedicalExamination) {
            department = departmentServices.getDepartmentById(request.getDepartmentId());
        }

        List<MedicalService> medicalServices = medicalServiceRepository.findByDepartmentAndServiceType(department, ServiceType.MedicalExamination);
        if (request.getServiceType() == ServiceType.MedicalExamination && !medicalServices.isEmpty()) {
            throw new StatusCodeException("Department already has a medical examination service", 409);
        }

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
    public FilteredMedicalServicesResponse getPaginationFilteredServices(
            String search,
            int page,
            int limit,
            List<ServiceType> serviceTypes
    ) {
        List<Department> departments = departmentRepository.findByDepartmentNameContaining(search);

        List<MedicalService> services = medicalServiceRepository.findByServiceNameContainingOrDepartmentInAndServiceTypeIn(
                search,
                departments,
                serviceTypes
        );

//        List<MedicalService> filteredServices = services.stream()
//                .filter(service -> serviceTypes.contains(service.getServiceType()))
//                .toList();

        Pageable pageable = PageRequest.of(page, limit);

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), services.size());
        List<MedicalService> medicalServices = services.subList(start, end);

        return new FilteredMedicalServicesResponse(medicalServices, services.size(), page, limit);
    }

    @Override
    public List<MedicalService> getAllActiveTests() {
        return medicalServiceRepository.findByServiceTypeAndDeletedIsFalseOrderByServiceName(
                ServiceType.MedicalTest
        );
    }

    @NotNull
    private static MedicalService getMedicalService(CreateServicesRequest request, Department department) {
        MedicalService medicalService = new MedicalService();
        medicalService.setPrice(request.getPrice());
        if (request.getServiceType() == ServiceType.MedicalExamination) {
            medicalService.setDepartment(department);
            medicalService.setDescription(department.getDescription());
        }
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

    @Override
    public List<MedicalService> doctorGetAllMedicalTests() {
        return medicalServiceRepository.getByServiceTypeAndDeletedIsFalse(
                ServiceType.MedicalTest
        );
    }

    @Override
    public MedicalService getMedicalServiceByIdAndServiceType(int serviceId, ServiceType serviceType) {
        MedicalService medicalService = medicalServiceRepository
                .findById(serviceId)
                .orElseThrow(() ->
                        new StatusCodeException("Medical service not found", 404)
                );

        if(medicalService.getServiceType() != serviceType || medicalService.isDeleted()) {
            throw new StatusCodeException("Medical service not found", 404);

        }

        return medicalService;
    }
}
