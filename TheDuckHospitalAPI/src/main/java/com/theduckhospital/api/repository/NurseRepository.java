package com.theduckhospital.api.repository;

import com.theduckhospital.api.constant.NurseType;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Nurse;
import com.theduckhospital.api.entity.Room;
import com.theduckhospital.api.entity.Staff;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
    Optional<Nurse> findByDepartmentAndHeadOfDepartmentIsTrue(Department department);

    @Query(value = "SELECT n FROM Nurse n " +
            "WHERE n.deleted IN :deleted " +
            "AND n.department.departmentId IN :departmentIds " +
            "AND n.fullName LIKE %:fullName%"
    )
    Page<Nurse> findNurse(@Param("fullName") String fullName,
                          @Param("deleted") List<Boolean> deleted,
                          @Param("departmentIds") List<Integer> departmentIds,
                          Pageable pageable
    );
}
