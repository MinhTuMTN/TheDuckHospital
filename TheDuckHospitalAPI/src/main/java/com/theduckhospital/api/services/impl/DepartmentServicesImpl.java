package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.dto.request.admin.CreateDepartmentRequest;
import com.theduckhospital.api.dto.request.admin.UpdateDepartmentRequest;
import com.theduckhospital.api.dto.response.admin.DepartmentResponse;
import com.theduckhospital.api.dto.response.admin.FilteredDepartmentsResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.*;
import com.theduckhospital.api.services.IDepartmentServices;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DepartmentServicesImpl implements IDepartmentServices {
    private final DepartmentRepository departmentRepository;
    private final DoctorRepository doctorRepository;
    private final NurseRepository nurseRepository;
    private final MedicalServiceRepository medicalServiceRepository;
    private final RoomRepository roomRepository;

    public DepartmentServicesImpl(DepartmentRepository departmentRepository,
                                  DoctorRepository doctorRepository,
                                  NurseRepository nurseRepository, MedicalServiceRepository medicalServiceRepository,
                                  RoomRepository roomRepository
    ) {
        this.departmentRepository = departmentRepository;
        this.doctorRepository = doctorRepository;
        this.nurseRepository = nurseRepository;
        this.medicalServiceRepository = medicalServiceRepository;
        this.roomRepository = roomRepository;
    }

    @Override
    public Department createDepartment(CreateDepartmentRequest request) {
        Department department = new Department();
        department.setDepartmentName(request.getDepartmentName());
        department.setDescription(request.getDescription());

        return departmentRepository.save(department);
    }

    @Override
    public Department updateDepartment(int departmentId, UpdateDepartmentRequest request) {
        Department department = getDepartmentById(departmentId);
        if (request.getDepartmentName() != null) {
            department.setDepartmentName(request.getDepartmentName());
        }

        if (request.getDescription() != null) {
            department.setDescription(request.getDescription());
        }

        if (request.getStaffId() != null) {
//            department.getDoctors().stream()
//                    .filter(Doctor::isHeadOfDepartment)
//                    .findFirst()
//                    .ifPresent(headDoctor -> headDoctor.setHeadOfDepartment(false));
            Doctor headDoctor = getHeadDoctor(department);
//            Optional<Doctor> doctorOptional = doctorRepository.findByDepartmentAndHeadOfDepartmentIsTrue(department);
            if (headDoctor != null) {
                headDoctor.setHeadOfDepartment(false);
                doctorRepository.save(headDoctor);
            }
            Optional<Doctor> optional = doctorRepository.findById(request.getStaffId());
            if (optional.isEmpty() || optional.get().isDeleted()) {
                throw new NotFoundException("Doctor not found");
            }
            optional.get().setHeadOfDepartment(true);
            doctorRepository.save(optional.get());
        }

        if (request.getHeadNurseId() != null) {
            Nurse headNurse = getHeadNurse(department);
//            Optional<Nurse> nurseOptional = nurseRepository.findByDepartmentAndHeadOfDepartmentIsTrue(department);
            if(headNurse != null){
//                Nurse nurse = nurseOptional.get();
                headNurse.setHeadOfDepartment(false);
                nurseRepository.save(headNurse);
            }
//            department.getNurses().stream()
//                    .filter(Nurse::isHeadOfDepartment)
//                    .findFirst()
//                    .ifPresent(headNurse -> headNurse.setHeadOfDepartment(false));
            Optional<Nurse> optional = nurseRepository.findById(request.getHeadNurseId());
            if (optional.isEmpty() || optional.get().isDeleted()) {
                throw new NotFoundException("Nurse not found");
            }
            optional.get().setHeadOfDepartment(true);
            nurseRepository.save(optional.get());
        }

        return departmentRepository.save(department);
    }

    @Override
    public boolean deleteDepartment(int departmentId) {
        Department department = getDepartmentById(departmentId);
        department.setDeleted(true);

        List<MedicalService> medicalServices = department.getMedicalServices();
        if(!medicalServices.isEmpty()) {
            medicalServices.forEach(service -> {
                service.setDeleted(true);
                medicalServiceRepository.save(service);
            });
        }

        List<Doctor> doctors = department.getDoctors();
        if(!doctors.isEmpty()) {
            doctors.forEach(doctor -> {
                doctor.setDepartment(null);
                doctorRepository.save(doctor);
            });
        }

        List<Room> rooms = department.getRooms();
        if(!rooms.isEmpty()) {
            rooms.forEach(room -> {
                room.setDepartment(null);
                roomRepository.save(room);
            });
        }

        departmentRepository.save(department);
        return true;
    }

    @Override
    public Department restoreDepartment(int departmentId) {
        Department department = getDepartmentById(departmentId);
        department.setDeleted(false);

        List<MedicalService> medicalServices = department.getMedicalServices();
        if(!medicalServices.isEmpty()) {
            medicalServices.forEach(service -> {
                service.setDeleted(false);
                medicalServiceRepository.save(service);
            });
        }

        return departmentRepository.save(department);
    }

    @Override
    public List<DepartmentResponse> getAllDepartments() {
        List<DepartmentResponse> departments = new ArrayList<>();

        for (Department department : departmentRepository.findAll()) {
//            Doctor headDoctor = department.getDoctors().stream()
//                    .filter(Doctor::isHeadOfDepartment)
//                    .findFirst()
//                    .orElse(null);
            departments.add(new DepartmentResponse(department, null, null));
        }

        return departments;
    }

    @Override
    public List<Doctor> getActiveDoctorsDepartment(int departmentId) {
        Department department = getDepartmentById(departmentId);

        List<Doctor> doctors = department.getDoctors();
        doctors.removeIf(Doctor::isDeleted);

        return doctors;
    }

    @Override
    public List<Nurse> getActiveNursesDepartment(int departmentId) {
        Department department = getDepartmentById(departmentId);

        List<Nurse> nurses = department.getNurses();
        nurses.removeIf(Nurse::isDeleted);

        return nurses;
    }

    @Override
    public FilteredDepartmentsResponse getPaginationFilteredDepartments(
            String search,
            int page,
            int limit
    ) {
        List<Department> departments = departmentRepository.findByDepartmentNameContaining(search);

        Pageable pageable = PageRequest.of(page, limit);

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), departments.size());
        List<Department> pageContent = departments.subList(start, end);

        List<DepartmentResponse> response = new ArrayList<>();
        for (Department department : pageContent) {
//            Doctor headDoctor = department.getDoctors().stream()
//                    .filter(Doctor::isHeadOfDepartment)
//                    .findFirst()
//                    .orElse(null);


//            Nurse headNurse = department.getNurses().stream()
//                    .filter(Nurse::isHeadOfDepartment)
//                    .findFirst()
//                    .orElse(null);
            response.add(new DepartmentResponse(department, getHeadDoctor(department), getHeadNurse(department)));
        }

        return new FilteredDepartmentsResponse(response, departments.size(), page, limit);
    }

    @Override
    public List<Department> getAllDepartmentsDeleted() {
        return departmentRepository.findAllByOrderByDepartmentNameDesc();
    }

    @Override
    public List<Department> getAllActiveDepartments() {
        return departmentRepository.findAllByDeletedIsFalseOrderByDepartmentNameAsc();
    }

    public Doctor getHeadDoctor(Department department) {
        Optional<Doctor> doctorOptional = doctorRepository.findByDepartmentAndHeadOfDepartmentIsTrue(department);
        return doctorOptional.orElse(null);
    }

    public Nurse getHeadNurse(Department department) {
        Optional<Nurse> nurseOptional = nurseRepository.findByDepartmentAndHeadOfDepartmentIsTrue(department);
        return nurseOptional.orElse(null);
    }

    @Override
    public DepartmentResponse getDepartmentResponseById(int departmentId) {
        Optional<Department> optional = departmentRepository.findById(departmentId);
        if (optional.isEmpty()) {
            throw new NotFoundException("Department not found");
        }

        Department department = optional.get();
        Doctor headDoctor = getHeadDoctor(department);

        Nurse headNurse = getHeadNurse(department);

        return new DepartmentResponse(department, headDoctor, headNurse);
    }

    @Override
    public Department getDepartmentById(int departmentId) {
        Optional<Department> optional = departmentRepository.findById(departmentId);
        if (optional.isEmpty()) {
            throw new NotFoundException("Department not found");
        }

        return optional.get();
    }

    @Override
    public Doctor addDoctorDepartment(int departmentId, UUID doctorId) {
        Department department = getDepartmentById(departmentId);

        Optional<Doctor> optional = doctorRepository.findById(doctorId);
        if (optional.isEmpty()) {
            throw new NotFoundException("Doctor not found");
        }

        Doctor doctor = optional.get();
        if (doctor.getDepartment() != null) {
            throw new IllegalStateException("Doctor already belongs to another department");
        }

        doctor.setDepartment(department);

        return doctorRepository.save(doctor);
    }

    @Override
    public Nurse addNurseDepartment(int departmentId, UUID nurseId) {
        Department department = getDepartmentById(departmentId);

        Optional<Nurse> optional = nurseRepository.findById(nurseId);
        if (optional.isEmpty()) {
            throw new NotFoundException("Nurse not found");
        }

        Nurse nurse = optional.get();
        if (nurse.getDepartment() != null) {
            throw new IllegalStateException("Nurse already belongs to another department");
        }

        nurse.setDepartment(department);

        return nurseRepository.save(nurse);
    }

    @Override
    public boolean removeDoctorDepartment(int departmentId, UUID doctorId) {
        Department department = getDepartmentById(departmentId);

        Optional<Doctor> optionalDoctor = doctorRepository.findByStaffIdAndDepartment(doctorId, department);
        if (optionalDoctor.isEmpty()) {
            throw new NotFoundException("Doctor not found");
        }

        Doctor doctor = optionalDoctor.get();

        if (doctor.isHeadOfDepartment()) {
            doctor.setHeadOfDepartment(false);
        }

        doctor.setDepartment(null);

        doctorRepository.save(doctor);

        return true;
    }

    @Override
    public boolean removeNurseDepartment(int departmentId, UUID nurseId) {
        Department department = getDepartmentById(departmentId);

        Optional<Nurse> optionalNurse = nurseRepository.findByStaffIdAndDepartment(nurseId, department);
        if (optionalNurse.isEmpty()) {
            throw new NotFoundException("Nurse not found");
        }

        Nurse nurse = optionalNurse.get();

        if (nurse.isHeadOfDepartment()) {
            nurse.setHeadOfDepartment(false);
        }

        nurse.setDepartment(null);

        nurseRepository.save(nurse);

        return true;
    }

    @Override
    public List<Department> getDepartmentsWithoutServices() {
        return departmentRepository.findDepartmentByMedicalServicesEmpty();
    }
}
