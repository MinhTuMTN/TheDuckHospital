package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.dto.response.DoctorItemResponse;
import com.theduckhospital.api.dto.response.PaginationResponse;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.AccountRepository;
import com.theduckhospital.api.repository.DoctorRepository;
import com.theduckhospital.api.security.JwtTokenProvider;
import com.theduckhospital.api.services.IDepartmentServices;
import com.theduckhospital.api.services.IDoctorServices;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DoctorServicesImpl implements IDoctorServices {
    private final DoctorRepository doctorRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final AccountRepository accountRepository;
    private final IDepartmentServices departmentServices;

    public DoctorServicesImpl(
            DoctorRepository doctorRepository,
            JwtTokenProvider jwtTokenProvider,
            AccountRepository accountRepository, IDepartmentServices departmentServices) {
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
        if (degree == null)
            doctors = doctorRepository
                    .findAllByFullNameContainingAndDepartment_DepartmentNameContainingAndDeletedIsFalseAndDoctorSchedulesNotEmpty(
                    fullName, department == null ? "" : department.getDepartmentName(),
                    pageable
            );
        else
            doctors = doctorRepository
                    .findAllByFullNameContainingAndDegreeAndDepartment_DepartmentNameContainingAndDeletedIsFalseAndDoctorSchedulesNotEmpty(
                    fullName, degree,
                    department == null ? "" : department.getDepartmentName(),
                    pageable
            );

        List<DoctorItemResponse> doctorItemResponses = new ArrayList<>();
        doctors.forEach(doctor -> {
            doctorItemResponses.add(new DoctorItemResponse(doctor));
        });

        return PaginationResponse.builder()
                .totalPages(doctors.getTotalPages())
                .totalItems((int) doctors.getTotalElements())
                .page(page)
                .limit(limit)
                .items(doctorItemResponses)
                .build();
    }
}
