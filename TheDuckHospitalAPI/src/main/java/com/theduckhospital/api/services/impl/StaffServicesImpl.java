package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.dto.request.admin.CreateStaffRequest;
import com.theduckhospital.api.dto.response.admin.FilteredRoomsResponse;
import com.theduckhospital.api.dto.response.admin.FilteredStaffsResponse;
import com.theduckhospital.api.dto.response.admin.StaffResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.AccountRepository;
import com.theduckhospital.api.repository.StaffRepository;
import com.theduckhospital.api.services.IDepartmentServices;
import com.theduckhospital.api.services.IMSGraphServices;
import com.theduckhospital.api.services.IStaffServices;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class StaffServicesImpl implements IStaffServices {
    private final StaffRepository staffRepository;
    private final AccountRepository accountRepository;
    private final IDepartmentServices departmentServices;
    private final PasswordEncoder passwordEncoder;
    private final IMSGraphServices graphServices;

    public StaffServicesImpl(
            StaffRepository staffRepository,
            IMSGraphServices graphServices,
            IDepartmentServices departmentServices,
            PasswordEncoder passwordEncoder,
            AccountRepository accountRepository
    ) {
        this.staffRepository = staffRepository;
        this.graphServices = graphServices;
        this.departmentServices = departmentServices;
        this.passwordEncoder = passwordEncoder;
        this.accountRepository = accountRepository;
    }
    @Override
    @Transactional
    public Map<String, Object> createStaff(CreateStaffRequest request) {
        try {
            Staff staff;
            switch (request.getRole()) {
                case DOCTOR -> staff = createDoctor(request);
                case NURSE -> staff = new Nurse();
                case CASHIER -> staff = new Cashier();
                case PHARMACIST -> staff = new Pharmacist();
                default -> staff = new Staff();
            }

            staff.setStaffId(UUID.randomUUID());
            staff.setGender(Gender.values()[request.getGender()]);
            staff.setFullName(request.getFullName());
            staff.setIdentityNumber(request.getIdentityNumber());
            staff.setPhoneNumber(request.getPhoneNumber());
            staff.setDateOfBirth(request.getDateOfBirth());

            Account account = new Account();
            account.setStaff(staff);
            account.setFullName(request.getFullName());
            account.setPhoneNumber(request.getPhoneNumber());
            account.setEmail(request.getEmail());
            String password = generatePassword();
            account.setPassword(passwordEncoder.encode(password));

            String msGraphId = graphServices.createMSGraphUser(
                    request.getFullName(),
                    request.getEmail(),
                    password
            );
            if (msGraphId == null) {
                throw new RuntimeException("An error occurred while creating user");
            }
            staff.setMsGraphId(msGraphId);

            accountRepository.save(account);
            staffRepository.save(staff);

            return Map.of(
                    "phoneNumber", request.getPhoneNumber(),
                    "email", request.getEmail(),
                    "password", password
            );
        } catch (Exception e) {
            e.printStackTrace();
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return null;
        }
    }

    private Doctor createDoctor(CreateStaffRequest request) {
        Department department = departmentServices.getDepartmentById(request.getDepartmentId());

        Doctor doctor = new Doctor();
        doctor.setDegree(request.getDegree());
        doctor.setDepartment(department);
        return doctor;
    }

    private String generatePassword() {
        return UUID.randomUUID().toString().substring(0, 8) + "@UTE";
    }

    @Override
    public List<StaffResponse> getAllStaffs() {
        List<Staff> staffs = staffRepository.findAll();

        return staffs.stream()
                .map(StaffResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    public boolean deleteStaff(UUID staffId) {
        Optional<Staff> optional = staffRepository.findById(staffId);
        if (optional.isEmpty() || optional.get().isDeleted()) {
            throw new NotFoundException("Staff not found");
        }

        Staff staff = optional.get();
        staff.setDeleted(true);

        Account account = staff.getAccount();
        account.setDeleted(true);

        accountRepository.save(account);
        staffRepository.save(staff);

        return true;
    }

    @Override
    public StaffResponse restoreStaff(UUID staffId) {
        Optional<Staff> optional = staffRepository.findById(staffId);
        if (optional.isEmpty() || !optional.get().isDeleted()) {
            throw new NotFoundException("Staff not found");
        }

        Staff staff = optional.get();
        staff.setDeleted(false);

        Account account = staff.getAccount();
        account.setDeleted(false);

        accountRepository.save(account);

        return new StaffResponse(staffRepository.save(staff));
    }

    @Override
    public StaffResponse getStaffById(UUID staffId) {
        Optional<Staff> optional = staffRepository.findById(staffId);
        if (optional.isEmpty()) {
            throw new NotFoundException("Staff not found");
        }

        Staff staff = optional.get();

        return new StaffResponse(staff);
    }

    @Override
    public FilteredStaffsResponse getPaginationStaffsDeleted(int page, int limit) {
        Pageable pageable = PageRequest.of(page, limit);
        Page<Staff> staffPage = staffRepository.findPaginationByOrderByDeleted(pageable);

        List<StaffResponse> filteredStaffs = new ArrayList<>();

        for (Staff staff : staffPage.getContent()) {
            filteredStaffs.add(new StaffResponse(staff));
        }

        List<Staff> staff = staffRepository.findAll();

        return new FilteredStaffsResponse(filteredStaffs, staff.size(), page, limit);
    }
}
