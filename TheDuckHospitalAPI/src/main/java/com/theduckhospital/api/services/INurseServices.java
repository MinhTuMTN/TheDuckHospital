package com.theduckhospital.api.services;

import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.Nurse;

import java.util.List;
import java.util.UUID;

public interface INurseServices {
    List<Nurse> getNursesNotInDepartment();
    boolean deleteHeadNurse(UUID staffId);
    Nurse getNurseById(UUID staffId);
}
