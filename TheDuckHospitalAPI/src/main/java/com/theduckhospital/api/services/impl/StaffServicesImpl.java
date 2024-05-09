package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.constant.Role;
import com.theduckhospital.api.dto.request.admin.CreateStaffRequest;
import com.theduckhospital.api.dto.request.admin.UpdateStaffRequest;
import com.theduckhospital.api.dto.response.admin.*;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.*;
import com.theduckhospital.api.services.ICloudinaryServices;
import com.theduckhospital.api.services.IDepartmentServices;
import com.theduckhospital.api.services.IMSGraphServices;
import com.theduckhospital.api.services.IStaffServices;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.multipart.MultipartFile;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

import static com.theduckhospital.api.constant.Role.*;

@Service
public class StaffServicesImpl implements IStaffServices {
    private final StaffRepository staffRepository;
    private final DoctorRepository doctorRepository;
    private final AccountRepository accountRepository;
    private final DoctorScheduleRepository doctorScheduleRepository;
    private final IDepartmentServices departmentServices;
    private final PasswordEncoder passwordEncoder;
    private final IMSGraphServices graphServices;
    private final LaboratoryTechnicianRepository laboratoryTechnicianRepository;
    private final NurseRepository nurseRepository;
    private final PharmacistRepository pharmacistRepository;
    private final CashierRepository cashierRepository;
    private final ICloudinaryServices cloudinaryServices;

    public StaffServicesImpl(
            StaffRepository staffRepository,
            IMSGraphServices graphServices,
            IDepartmentServices departmentServices,
            PasswordEncoder passwordEncoder,
            AccountRepository accountRepository,
            DoctorScheduleRepository doctorScheduleRepository,
            DoctorRepository doctorRepository,
            LaboratoryTechnicianRepository laboratoryTechnicianRepository,
            NurseRepository nurseRepository,
            PharmacistRepository pharmacistRepository,
            CashierRepository cashierRepository,
            ICloudinaryServices cloudinaryServices
    ) {
        this.staffRepository = staffRepository;
        this.graphServices = graphServices;
        this.departmentServices = departmentServices;
        this.passwordEncoder = passwordEncoder;
        this.accountRepository = accountRepository;
        this.doctorScheduleRepository = doctorScheduleRepository;
        this.doctorRepository = doctorRepository;
        this.laboratoryTechnicianRepository = laboratoryTechnicianRepository;
        this.nurseRepository = nurseRepository;
        this.pharmacistRepository = pharmacistRepository;
        this.cashierRepository = cashierRepository;
        this.cloudinaryServices = cloudinaryServices;
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
                case LABORATORY_TECHNICIAN ->  staff = new LaboratoryTechnician();
                case SUPPORT_AGENT -> staff = new SupportAgent();
                default -> staff = new Staff();
            }

            String url = cloudinaryServices.uploadFile(request.getAvatar());
            if (url.isEmpty()) {
                throw new BadRequestException("Đã có lỗi xảy ra");
            }
            staff.setAvatar(url);
            staff.setStaffId(UUID.randomUUID());
            staff.setGender(Gender.values()[request.getGender()]);
            staff.setFullName(request.getFullName());
            staff.setIdentityNumber(request.getIdentityNumber());
            staff.setPhoneNumber(request.getPhoneNumber());
            DateFormat df = new SimpleDateFormat("MM/dd/yyyy");
            Date dateOfBirth = new Date();
            try {
                dateOfBirth = df.parse(request.getDateOfBirth());
            } catch (ParseException e) {
                e.printStackTrace();
            }
            staff.setDateOfBirth(dateOfBirth);

            Account account = new Account();
            account.setStaff(staff);
            account.setFullName(request.getFullName());
            account.setPhoneNumber(request.getPhoneNumber());
            account.setEmail(request.getEmail());
            account.setWalletLocked(true);
            account.setWalletPinCount(0);
//            String password = generatePassword();
            String password = "MinhTu@3005";
            account.setPassword(passwordEncoder.encode(password));

//            if (request.getEmail().endsWith("@theduckhospital.onmicrosoft.com")) {
//                String msGraphId = graphServices.createMSGraphUser(
//                        request.getFullName(),
//                        request.getEmail(),
//                        password
//                );
//                if (msGraphId == null) {
//                    throw new RuntimeException("An error occurred while creating user");
//                }
//                staff.setMsGraphId(msGraphId);
//            }

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

    @Override
    public Staff updateStaff(UUID staffId, UpdateStaffRequest request) {
        Staff staff;
        Optional<?> optional;
        switch (request.getRole()) {
            case DOCTOR ->  {
                optional = doctorRepository.findById(staffId);
                if (optional.isEmpty()) {
                    throw new NotFoundException("Doctor not found");
                }
                Doctor doctor = (Doctor) optional.get();
                doctor.setDegree(request.getDegree());
                staff = doctor;
            }
            case NURSE -> {
                optional = nurseRepository.findById(staffId);
                if (optional.isEmpty()) {
                    throw new NotFoundException("Nurse not found");
                }
                staff = (Nurse) optional.get();
            }
            case CASHIER -> {
                optional = cashierRepository.findById(staffId);
                    if (optional.isEmpty()) {
                        throw new NotFoundException("Cashier not found");
                    }
                    staff = (Cashier) optional.get();
            }
            case PHARMACIST -> {
                optional = pharmacistRepository.findById(staffId);
                    if (optional.isEmpty()) {
                        throw new NotFoundException("Pharmacist not found");
                    }
                    staff = (Pharmacist) optional.get();
            }
            case LABORATORY_TECHNICIAN ->  {
                optional = laboratoryTechnicianRepository.findById(staffId);
                if (optional.isEmpty()) {
                    throw new NotFoundException("Pharmacist not found");
                }
                staff = (Pharmacist) optional.get();
            }
            default -> {
                optional = staffRepository.findById(staffId);
                if (optional.isEmpty()) {
                    throw new NotFoundException("Pharmacist not found");
                }
                staff = (Staff) optional.get();
            }
        }

        staff.setGender(Gender.values()[request.getGender()]);
        staff.setFullName(request.getFullName());
        staff.setIdentityNumber(request.getIdentityNumber());
        staff.setPhoneNumber(request.getPhoneNumber());
        DateFormat df = new SimpleDateFormat("MM/dd/yyyy");
        Date dateOfBirth = new Date();
        try {
            dateOfBirth = df.parse(request.getDateOfBirth());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        staff.setDateOfBirth(dateOfBirth);

        String url = cloudinaryServices.uploadFile(request.getAvatar());
        if (url.isEmpty()) {
            throw new BadRequestException("Đã có lỗi xảy ra");
        }
        staff.setAvatar(url);

        return staffRepository.save(staff);
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

        if (staff instanceof  Doctor) {
            List<DoctorSchedule> schedules = ((Doctor)staff).getDoctorSchedules();
            if(!schedules.isEmpty()) {
                schedules.forEach(schedule -> {
                    schedule.setDeleted(true);
                    doctorScheduleRepository.save(schedule);
                });
            }
        }

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
    public FilteredStaffsResponse getPaginationFilteredStaffs(
            String search,
            int page,
            int limit,
            List<Role> staffRole,
            List<Boolean> staffStatus
    ) {
        List<Staff> staffs = staffRepository.findByFullNameContainingAndDeletedIn(search, staffStatus);

        List<Staff> filteredStaffs = staffs.stream()
                .filter(staff -> (staffRole.contains(DOCTOR) && staff instanceof Doctor)
                        || (staffRole.contains(NURSE) && staff instanceof Nurse)
                        || (staffRole.contains(CASHIER) && staff instanceof Cashier)
                        || (staffRole.contains(PHARMACIST) && staff instanceof Pharmacist)
                        || (staffRole.contains(LABORATORY_TECHNICIAN) && staff instanceof LaboratoryTechnician))
                .collect(Collectors.toList());

        Pageable pageable = PageRequest.of(page, limit);

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), filteredStaffs.size());
        List<Staff> pageContent = filteredStaffs.subList(start, end);

        List<StaffResponse> response = new ArrayList<>();
        for (Staff staff : pageContent) {
            response.add(new StaffResponse(staff));
        }

        return new FilteredStaffsResponse(response, filteredStaffs.size(), page, limit);
    }
}
