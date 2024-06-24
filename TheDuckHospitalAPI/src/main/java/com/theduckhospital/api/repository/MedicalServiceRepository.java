package com.theduckhospital.api.repository;

import com.theduckhospital.api.constant.ServiceType;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.MedicalService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalServiceRepository extends JpaRepository<MedicalService, Integer> {
    Page<MedicalService> findPaginationByOrderByDeleted(Pageable pageable);

    List<MedicalService> getByServiceTypeAndDeletedIsFalse(ServiceType serviceType);

    //    List<MedicalService> findByServiceNameContainingOrDepartmentIn(String serviceName, List<Department> departmentList);
    List<MedicalService> findByServiceNameContainingOrDepartmentInAndServiceTypeIn(
            String serviceName,
            List<Department> departments,
            List<ServiceType> serviceTypes
    );

    List<MedicalService> findByDepartmentAndServiceType(Department department, ServiceType serviceType);
}
