package com.theduckhospital.api.services;

import com.theduckhospital.api.entity.Doctor;

import java.util.List;
import java.util.UUID;

public interface IDoctorServices {
    boolean deleteHeadDoctor(UUID staffId);

    Doctor getDoctorById(UUID staffId);

    List<Doctor> getDoctorNotInDepartment();
    Doctor getDoctorByToken(String token);
}
