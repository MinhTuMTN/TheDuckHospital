package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.constant.Role;
import com.theduckhospital.api.constant.RoleCommon;
import com.theduckhospital.api.dto.request.admin.CreateStaffRequest;
import com.theduckhospital.api.dto.request.admin.UpdateStaffRequest;
import com.theduckhospital.api.dto.response.admin.FilteredStaffsResponse;
import com.theduckhospital.api.dto.response.admin.StaffResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.*;
import com.theduckhospital.api.services.ICloudinaryServices;
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

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

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
                case NURSE -> staff = createNurse(request);
                case CASHIER -> staff = new Cashier();
                case PHARMACIST -> staff = new Pharmacist();
                case LABORATORY_TECHNICIAN -> staff = new LaboratoryTechnician();
                case SUPPORT_AGENT -> staff = new SupportAgent();
                default -> staff = new Staff();
            }

            staff.setAvatar(null);
            staff.setStaffId(UUID.randomUUID());
            staff.setGender(Gender.values()[request.getGender()]);
            staff.setFullName(request.getFullName());
            staff.setIdentityNumber(request.getIdentityNumber());
            staff.setPhoneNumber(request.getPhoneNumber());
            DateFormat df = new SimpleDateFormat("MM/dd/yyyy");
            Date dateOfBirth = new Date();
            try {
                dateOfBirth = df.parse(request.getDateOfBirth());
            } catch (ParseException ignored) {
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
            updateAvatarAsync(staff.getStaffId(), request.getAvatar().getBytes());

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
    public void updateAvatarAsync(UUID staffId, Object avatar) {
        CompletableFuture.runAsync(() -> {
            try {
                String url = cloudinaryServices.uploadFile(avatar);
                Optional<Staff> optional = staffRepository.findById(staffId);
                if (optional.isEmpty()) {
                    throw new NotFoundException("Staff not found");
                }

                Staff staff = optional.get();
                staff.setAvatar(url);
                staffRepository.save(staff);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    @Override
    public Staff updateStaff(UUID staffId, UpdateStaffRequest request) throws IOException {
        Staff staff;
        Optional<?> optional;
        switch (request.getRole()) {
            case DOCTOR -> {
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
                Nurse nurse = (Nurse) optional.get();
                nurse.setNurseType(request.getNurseType());
                if (request.getNurseType() == null) {
                    nurse.setHeadOfDepartment(false);
                    nurse.setDepartment(null);
                }
                staff = nurse;
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
            case LABORATORY_TECHNICIAN -> {
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

        if (request.getAvatar() != null) {
            updateAvatarAsync(staffId, request.getAvatar().getBytes());
        }

        return staffRepository.save(staff);
    }

    private Doctor createDoctor(CreateStaffRequest request) {
        Department department = departmentServices.getDepartmentById(request.getDepartmentId());

        Doctor doctor = new Doctor();
        doctor.setDegree(request.getDegree());
        doctor.setDepartment(department);
        return doctor;
    }

    private Nurse createNurse(CreateStaffRequest request) {
        if (request.getDepartmentId() == null || request.getNurseType() == null) {
            return new Nurse();
        }
        Department department = departmentServices.getDepartmentById(request.getDepartmentId());

        Nurse nurse = new Nurse();
        nurse.setNurseType(request.getNurseType());
        nurse.setDepartment(department);
        return nurse;
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

        if (staff instanceof Doctor) {
            ((Doctor) staff).setHeadOfDepartment(false);
            ((Doctor) staff).setDepartment(null);
            List<DoctorSchedule> schedules = ((Doctor) staff).getDoctorSchedules();
            if (!schedules.isEmpty()) {
                schedules.forEach(schedule -> {
                    schedule.setDeleted(true);
                    doctorScheduleRepository.save(schedule);
                });
            }
        } else if (staff instanceof Nurse) {
            ((Nurse) staff).setHeadOfDepartment(false);
            ((Nurse) staff).setDepartment(null);
//            List<DoctorSchedule> schedules = ((Nurse)staff).getDoctorSchedules();
//            if(!schedules.isEmpty()) {
//                schedules.forEach(schedule -> {
//                    schedule.setDeleted(true);
//                    doctorScheduleRepository.save(schedule);
//                });
//            }
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

    private int getDepartmentIdByRole(Staff staff) {
        if (staff instanceof Doctor doctor) {
            return doctor.getDepartment() != null ? doctor.getDepartment().getDepartmentId() : -1;
        }
        if (staff instanceof Nurse nurse) {
            return nurse.getDepartment() != null ? nurse.getDepartment().getDepartmentId() : -1;
        }
        return -1;
    }

    @Override
    public FilteredStaffsResponse getPaginationFilteredStaffs(
            String search,
            int page,
            int limit,
            List<Role> staffRole,
            List<Integer> departmentIds,
            List<Boolean> staffStatus
    ) {
        List<Class<? extends Staff>> classes = RoleCommon.getClassesByRoles(staffRole);

        Pageable pageable = PageRequest.of(page, limit);
        Page<? extends Staff> staffs = null;
        List<Staff> staffList = new ArrayList<>();
        List<Staff> staffListFiltered = new ArrayList<>();

        List<StaffResponse> response = new ArrayList<>();
        if (departmentIds == null || departmentIds.isEmpty()) {
            staffs = staffRepository
                    .findStaffPage(search, staffStatus, classes, pageable);
        } else {
            if (classes.contains(Doctor.class) && classes.contains(Nurse.class)) {
//                List<Class<? extends Staff>> newClasses = RoleCommon.getClassesByRoles(Arrays.asList(Role.DOCTOR, Role.NURSE));

                List<Class<? extends Staff>> newClasses = new ArrayList<>(classes);
                newClasses.clear();
                newClasses.add(Doctor.class);
                newClasses.add(Nurse.class);
                List<Staff> list = staffRepository
                        .findStaffList(search, staffStatus, newClasses);

                Map<Integer, Boolean> departmentIdMap = new HashMap<>();
                departmentIds.forEach(departmentId -> departmentIdMap.put(departmentId, true));

                staffList = list.parallelStream()
                        .filter(staff -> {
                            int departmentId = getDepartmentIdByRole(staff);
                            return departmentIdMap.containsKey(departmentId);
                        })
                        .collect(Collectors.toList());

//
//                staffList = list.stream()
//                        .filter(staff -> departmentIds.contains(staff instanceof Doctor ?
//                                ((Doctor) staff).getDepartment() == null ?
//                                        -1 :
//                                        ((Doctor) staff).getDepartment().getDepartmentId() :
//                                ((Nurse) staff).getDepartment() == null ?
//                                        -1 :
//                                        ((Nurse) staff).getDepartment().getDepartmentId()))
//                        .toList();
                staffListFiltered = staffList.subList(page * limit, page * limit + limit);
                for (Staff staff : staffListFiltered) {
                    response.add(new StaffResponse(staff));
                }

            } else if (classes.contains(Doctor.class)) {
                Page<Doctor> doctors = doctorRepository.findDoctor(search, staffStatus, departmentIds, pageable);
                staffs = doctors.map(doctor -> (Staff) doctor);
            } else if (classes.contains(Nurse.class)) {
                Page<Nurse> nurses = nurseRepository.findNurse(search, staffStatus, departmentIds, pageable);
                staffs = nurses.map(nurse -> (Staff) nurse);
            }
        }
//        Page<Staff> staffs = staffRepository
//                .findStaff(search, staffStatus, classes, pageable);


        if (staffs != null) {
            for (Staff staff : staffs.getContent()) {
                response.add(new StaffResponse(staff));
            }
        }

        return new FilteredStaffsResponse(
                response,
                (int) (staffs == null ? staffList.isEmpty() ? 0 : staffList.size() : staffs.getTotalElements()),
                page,
                limit
        );
    }
}
