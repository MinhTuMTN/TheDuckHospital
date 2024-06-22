package com.theduckhospital.api.repository;

import com.theduckhospital.api.constant.NurseType;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Nurse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface NurseRepository extends JpaRepository<Nurse, UUID> {
    Optional<Nurse> findByStaffIdAndDepartment(UUID staffId, Department department);
    List<Nurse> findByDepartmentIsNull();
    Page<Nurse> findByFullNameContainingAndDepartmentAndNurseTypeAndDeletedIsFalse(
            String fullName,
            Department department,
            NurseType nurseType,
            Pageable pageable
    );
    List<Nurse> findByDepartmentIsNullAndNurseTypeIsNotNull();
    long countByDepartmentAndDeletedIsFalse(Department department);
}
