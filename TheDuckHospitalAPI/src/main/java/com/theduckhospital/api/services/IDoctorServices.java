package com.theduckhospital.api.services;

import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.dto.response.PaginationResponse;
import com.theduckhospital.api.dto.response.admin.FilteredActiveDoctorsResponse;
import com.theduckhospital.api.dto.response.doctor.HeadDoctorResponse;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Doctor;

import java.util.List;
import java.util.UUID;

public interface IDoctorServices {
    boolean deleteHeadDoctor(UUID staffId);
    Doctor getDoctorById(UUID staffId);

    List<Doctor> getDoctorNotInDepartment();
    Doctor getDoctorByToken(String token);

    FilteredActiveDoctorsResponse getPaginationActiveDoctorsDepartment(
            String authorization,
            String search,
            int page,
            int limit
    );

    PaginationResponse getMedicalExaminationDoctors(
            String fullName,
            Integer departmentId,
            Degree degree,
            int page,
            int limit
    );

    Doctor findHeadDoctor(Department department);
    List<HeadDoctorResponse> getAllHeadDoctors();
}
