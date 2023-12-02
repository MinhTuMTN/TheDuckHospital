package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.dto.request.CreateDepartmentRequest;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.DepartmentRepository;
import com.theduckhospital.api.services.IDepartmentServices;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentServicesImpl implements IDepartmentServices {
    private final DepartmentRepository departmentRepository;

    public DepartmentServicesImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public Department createDepartment(CreateDepartmentRequest request) {
        Department department = new Department();
        department.setDepartmentName(request.getDepartmentName());
        department.setDescription(request.getDepartmentDescription());

        return departmentRepository.save(department);
    }

    @Override
    public Department updateDepartment(int departmentId, CreateDepartmentRequest request) {
        Optional<Department> optional = departmentRepository.findById(departmentId);
        if (optional.isEmpty() || optional.get().isDeleted()) {
            throw new NotFoundException("Department not found");
        }

        Department department = optional.get();
        if (request.getDepartmentName() != null) {
            department.setDepartmentName(request.getDepartmentName());
        }
        if (request.getDepartmentDescription() != null) {
            department.setDescription(request.getDepartmentDescription());
        }

        return departmentRepository.save(department);
    }

    @Override
    public boolean deleteDepartment(int departmentId) {
        Optional<Department> optional = departmentRepository.findById(departmentId);
        if (optional.isEmpty() || optional.get().isDeleted()) {
            throw new NotFoundException("Department not found");
        }

        Department department = optional.get();
        department.setDeleted(true);
        departmentRepository.save(department);

        return true;
    }

    @Override
    public Department restoreDepartment(int departmentId) {
        Optional<Department> optional = departmentRepository.findById(departmentId);
        if (optional.isEmpty() || !optional.get().isDeleted()) {
            throw new NotFoundException("Department not found");
        }

        Department department = optional.get();
        department.setDeleted(false);
        return departmentRepository.save(department);
    }

    @Override
    public List<Department> getAllDepartments() {
        return departmentRepository.findAllByDeletedIsFalseOrderByDepartmentNameDesc();
    }

    @Override
    public List<Department> getAllDepartmentsDeleted() {
        return departmentRepository.findAllByOrderByDepartmentNameDesc();
    }

    @Override
    public Department getDepartmentById(int departmentId) {
        Optional<Department> optional = departmentRepository.findById(departmentId);
        if (optional.isEmpty() || optional.get().isDeleted()) {
            throw new NotFoundException("Department not found");
        }

        return optional.get();
    }
}
