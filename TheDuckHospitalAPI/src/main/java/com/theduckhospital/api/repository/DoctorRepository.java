package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.entity.Doctor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, UUID> {
    List<Doctor> findByDepartmentIsNull();
    Optional<Doctor> findByStaffIdAndDepartment(UUID doctorId, Department department);
    Page<Doctor> findAllByFullNameContainingAndDegreeAndDepartment_DepartmentNameContainingAndDeletedIsFalseAndDoctorSchedulesNotEmpty(
            String fullName, Degree degree, String department_departmentName, Pageable pageable
    );

    Page<Doctor> findAllByFullNameContainingAndDepartment_DepartmentNameContainingAndDeletedIsFalseAndDoctorSchedulesNotEmpty(
            String fullName, String department_departmentName, Pageable pageable
    );
}
