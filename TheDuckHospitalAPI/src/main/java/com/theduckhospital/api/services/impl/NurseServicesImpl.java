package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.Nurse;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.NurseRepository;
import com.theduckhospital.api.services.INurseServices;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class NurseServicesImpl implements INurseServices {
    private final NurseRepository nurseRepository;
    public NurseServicesImpl(NurseRepository nurseRepository) {
        this.nurseRepository = nurseRepository;
    }

    @Override
    public List<Nurse> getNursesNotInDepartment() {
        return nurseRepository.findByDepartmentIsNullAndNurseTypeIsNotNull();
    }

    @Override
    public boolean deleteHeadNurse(UUID staffId) {
        Nurse nurse = getNurseById(staffId);
        nurse.setHeadOfDepartment(false);
        nurseRepository.save(nurse);

        return true;
    }

    @Override
    public Nurse getNurseById(UUID staffId) {
        Optional<Nurse> optional = nurseRepository.findById(staffId);
        if (optional.isEmpty()) {
            throw new NotFoundException("Nurse not found");
        }

        return optional.get();
    }
}
