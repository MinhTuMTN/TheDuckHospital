package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.entity.Doctor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, UUID> {
    List<Doctor> findByDepartmentIsNull();
    long countByDeletedFalse();
    Optional<Doctor> findByStaffIdAndDepartment(UUID doctorId, Department department);
    Page<Doctor> findAllByFullNameContainingAndDegreeAndDepartment_DepartmentNameContainingAndDeletedIsFalseAndDoctorSchedulesNotEmpty(
            String fullName, Degree degree, String department_departmentName, Pageable pageable
    );
    Page<Doctor> findByFullNameContainingAndDeletedFalseAndDepartment(String fullName, Department department, Pageable pageable);
    long countByDeletedFalseAndDepartment(Department department);
    Page<Doctor> findAllByFullNameContainingAndDepartment_DepartmentNameContainingAndDeletedIsFalseAndDoctorSchedulesNotEmpty(
            String fullName, String department_departmentName, Pageable pageable
    );
    @Query("SELECT d " +
            "FROM Doctor d " +
            "WHERE d.deleted = false " +
            "AND d.department.departmentName LIKE %:departmentName% " +
            "AND d.degree = :degree " +
            "AND d.fullName LIKE %:fullName% " +
            "AND (SELECT COUNT(ds) FROM DoctorSchedule ds WHERE ds.doctor = d AND ds.date > :today) > 0"
    )
    Page<Doctor> findDoctorsByDegree(
            String fullName,
            Degree degree,
            String departmentName,
            Date today,
            Pageable pageable
    );
    List<Doctor> findAllByHeadOfDepartmentIsTrue();
    List<Doctor> findByDepartmentOrderByRatingDesc(Department department);
    @Query("SELECT d " +
            "FROM Doctor d " +
            "WHERE d.deleted = false " +
            "AND d.department.departmentName LIKE %:departmentName% " +
            "AND d.fullName LIKE %:fullName% " +
            "AND (SELECT COUNT(ds) FROM DoctorSchedule ds WHERE ds.doctor = d AND ds.date > :today) > 0"
    )
    Page<Doctor> findDoctorsWithoutDegree(
            String fullName,
            String departmentName,
            Date today,
            Pageable pageable
    );
    long countByDepartmentAndDeletedIsFalse(Department department);
    List<Doctor> findDoctorsByDepartmentAndDeletedIsFalse(Department department);
}
