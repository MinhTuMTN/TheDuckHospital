package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Integer> {
    List<Department> findAllByDeletedIsFalseOrderByDepartmentNameDesc();
    List<Department> findAllByOrderByDepartmentNameDesc();
    Page<Department> findPaginationByOrderByDeleted(Pageable pageable);
    List<Department> findDepartmentByMedicalServicesEmpty();
    List<Department> findByDepartmentNameContaining(String departmentName);
}
