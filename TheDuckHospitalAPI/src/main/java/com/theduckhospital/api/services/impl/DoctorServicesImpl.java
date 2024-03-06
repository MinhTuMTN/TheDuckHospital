package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.DateCommon;
import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.dto.response.DoctorItemResponse;
import com.theduckhospital.api.dto.response.PaginationResponse;
import com.theduckhospital.api.dto.response.admin.ActiveDoctorResponse;
import com.theduckhospital.api.dto.response.admin.FilteredActiveDoctorsResponse;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.DoctorSchedule;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.AccountRepository;
import com.theduckhospital.api.repository.DoctorRepository;
import com.theduckhospital.api.security.JwtTokenProvider;
import com.theduckhospital.api.services.IDepartmentServices;
import com.theduckhospital.api.services.IDoctorServices;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class DoctorServicesImpl implements IDoctorServices {
    private final DoctorRepository doctorRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final AccountRepository accountRepository;
    private final IDepartmentServices departmentServices;

    public DoctorServicesImpl(
            DoctorRepository doctorRepository,
            JwtTokenProvider jwtTokenProvider,
            AccountRepository accountRepository,
            IDepartmentServices departmentServices
    ) {
        this.doctorRepository = doctorRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.accountRepository = accountRepository;
        this.departmentServices = departmentServices;
    }

    @Override
    public boolean deleteHeadDoctor(UUID staffId) {
        Doctor doctor = getDoctorById(staffId);
        doctor.setHeadOfDepartment(false);
        doctorRepository.save(doctor);

        return true;
    }

    @Override
    public Doctor getDoctorById(UUID staffId) {
        Optional<Doctor> optional = doctorRepository.findById(staffId);
        if (optional.isEmpty()) {
            throw new NotFoundException("Doctor not found");
        }

        return optional.get();
    }

    @Override
    public List<Doctor> getDoctorNotInDepartment() {
        return doctorRepository.findByDepartmentIsNull();
    }
    
    public Doctor getDoctorByToken(String token) {
        // Remove "Bearer " from token
        token = token.substring(7);

        UUID userId = UUID.fromString(jwtTokenProvider.getUserIdFromJwt(token));
        Account account = accountRepository.findById(userId).orElseThrow(() -> new NotFoundException("Account not found"));
        if (account.isDeleted())
            throw new NotFoundException("Account not found");

        if (account.getStaff() == null)
            throw new NotFoundException("Doctor not found");

        Doctor doctor = doctorRepository.findById(account.getStaff().getStaffId())
                .orElseThrow(() -> new NotFoundException("Doctor not found"));
        if (doctor.isDeleted())
            throw new NotFoundException("Doctor not found");

        return doctor;
    }

    @Override
    public FilteredActiveDoctorsResponse getPaginationActiveDoctorsDepartment(
            String authorization,
            String search,
            int page,
            int limit
    ) {
        Doctor headDoctor = getDoctorByToken(authorization);
        if (!headDoctor.isHeadOfDepartment()) {
            throw new RuntimeException("You are not head of department");
        }

        Department department = headDoctor.getDepartment();

        Pageable pageable = PageRequest.of(page, limit);
        Page<Doctor> doctorPage = doctorRepository
                .findByFullNameContainingAndDeletedFalseAndDepartment(search, department, pageable);

        List<ActiveDoctorResponse> filteredDoctors = new ArrayList<>();

        for (Doctor doctor : doctorPage.getContent()) {
            filteredDoctors.add(new ActiveDoctorResponse(doctor));
        }

        return new FilteredActiveDoctorsResponse(
                filteredDoctors,
                doctorRepository.countByDeletedFalseAndDepartment(department),
                page,
                limit);
    }

    @Override
    public PaginationResponse getMedicalExaminationDoctors(
            String fullName,
            Integer departmentId,
            Degree degree,
            int page,
            int limit
    ) {
        Pageable pageable = Pageable.ofSize(limit).withPage(page - 1);

        Department department = null;
        if (departmentId != null) {
            department = departmentServices.getDepartmentById(departmentId);
        } 

        Page<Doctor> doctors;
//        if (degree == null)
//            doctors = doctorRepository
//                    .findAllByFullNameContainingAndDepartment_DepartmentNameContainingAndDeletedIsFalseAndDoctorSchedulesNotEmpty(
//                    fullName, department == null ? "" : department.getDepartmentName(),
//                    pageable
//            );
//        else
//            doctors = doctorRepository
//                    .findAllByFullNameContainingAndDegreeAndDepartment_DepartmentNameContainingAndDeletedIsFalseAndDoctorSchedulesNotEmpty(
//                    fullName, degree,
//                    department == null ? "" : department.getDepartmentName(),
//                    pageable
//            );
        if (degree == null)
            doctors = doctorRepository
                    .findDoctorsWithoutDegree(
                    fullName, department == null ? "" : department.getDepartmentName(),
                    DateCommon.getToday(),
                    pageable
                    );
        else
            doctors = doctorRepository
                    .findDoctorsByDegree(
                    fullName, degree,
                    department == null ? "" : department.getDepartmentName(),
                    DateCommon.getToday(),
                    pageable
                    );

        List<DoctorItemResponse> doctorItemResponses = new ArrayList<>();
        AtomicInteger remove = new AtomicInteger();
        doctors.forEach(doctor -> {
            List<DoctorSchedule> doctorSchedules = doctor.getDoctorSchedules();
            doctorSchedules.removeIf(doctorSchedule -> doctorSchedule.isDeleted()
                    || doctorSchedule.getDate().before(DateCommon.getToday())
            );
                if (doctorSchedules.isEmpty()) {
                remove.getAndIncrement();
                return;
            }
            doctorItemResponses.add(new DoctorItemResponse(doctor));
        });

        // Recalculate total pages
        int totalPages = (int) Math.ceil((double) (doctors.getTotalElements() - remove.get()) / limit);
        int totalItems = (int) (doctors.getTotalElements() - remove.get());

        return PaginationResponse.builder()
                .totalPages(totalPages)
                .totalItems(totalItems)
                .page(page)
                .limit(limit)
                .items(doctorItemResponses)
                .build();
    }

    @Override
    public Doctor findHeadDoctor(Department department) {
        if (department.getDoctors() != null) {
            return department.getDoctors().stream()
                    .filter(Doctor::isHeadOfDepartment)
                    .findFirst()
                    .orElse(null);
        }
        return null;
    }
}
