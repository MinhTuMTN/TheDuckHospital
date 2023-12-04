package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.dto.request.CreateStaffRequest;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.repository.AccountRepository;
import com.theduckhospital.api.repository.StaffRepository;
import com.theduckhospital.api.services.IDepartmentServices;
import com.theduckhospital.api.services.IMSGraphServices;
import com.theduckhospital.api.services.IStaffServices;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.Map;
import java.util.UUID;

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
}
