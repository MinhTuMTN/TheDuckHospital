package com.theduckhospital.api.repository;

import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.constant.ScheduleSession;
import com.theduckhospital.api.constant.ScheduleType;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Doctor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
    Page<Doctor> findByFullNameContainingAndDeletedFalseAndDepartment(String fullName, Department department, Pageable pageable);
    long countByDeletedFalseAndDepartment(Department department);
    @Query("SELECT d " +
            "FROM Doctor d " +
            "WHERE d.deleted = false " +
            "AND d.department.departmentName LIKE %:departmentName% " +
            "AND d.fullName LIKE %:fullName% " +
            "AND (:degree IS NULL OR d.degree = :degree) " +
            "AND (" +
            "   SELECT COUNT(ds) " +
            "   FROM DoctorSchedule ds " +
            "   WHERE ds.doctor = d " +
            "   AND ds.date > :today " +
            "   AND ds.scheduleType = :examinationType " +
            ") > 0")
    Page<Doctor> findDoctorsForBooking(
            String fullName,
            Degree degree,
            String departmentName,
            Date today,
            ScheduleType examinationType,
            Pageable pageable
    );
    List<Doctor> findAllByHeadOfDepartmentIsTrue();
    @Query(value = "SELECT d FROM Doctor d WHERE d.department.departmentId = :departmentId ORDER BY d.rating DESC LIMIT 5")
    List<Doctor> findTop5DoctorsByDepartment(@Param("departmentId") int departmentId);
    List<Doctor> findByDepartmentAndDeletedIsFalse(Department department);
    @Query("SELECT d FROM Doctor d WHERE d.department = :department AND " +
            "d.deleted = false AND " +
            "NOT EXISTS (SELECT ds FROM DoctorSchedule ds WHERE ds.doctor = d AND " +
            "ds.date = :date AND ds.scheduleSession = :scheduleSession)")
    List<Doctor> findActiveDoctorsForExamination(
            Department department,
            Date date,
            ScheduleSession scheduleSession
    );
    @Query("SELECT d FROM Doctor d WHERE d.department = :department AND " +
            "d.deleted = false AND " +
            "NOT EXISTS (SELECT ds FROM DoctorSchedule ds WHERE ds.doctor = d AND " +
            "ds.date = :date AND ds.scheduleType = :scheduleType AND ds.scheduleSession = :scheduleSession)")
    List<Doctor> findActiveDoctorsForNonExamination(
            Department department,
            Date date,
            ScheduleType scheduleType,
            ScheduleSession scheduleSession
    );
    long countByDepartmentAndDeletedIsFalse(Department department);
    List<Doctor> findDoctorsByDepartmentAndDeletedIsFalse(Department department);
    Optional<Doctor> findByDepartmentAndHeadOfDepartmentIsTrue(Department department);
    @Query(value = "SELECT d FROM Doctor d " +
            "WHERE d.deleted IN :deleted " +
            "AND d.department.departmentId IN :departmentIds " +
            "AND d.fullName LIKE %:fullName%"
    )
    Page<Doctor> findDoctor(@Param("fullName") String fullName,
                            @Param("deleted") List<Boolean> deleted,
                            @Param("departmentIds") List<Integer> departmentIds,
                            Pageable pageable
    );
}
