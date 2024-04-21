package com.theduckhospital.api.services;

import com.theduckhospital.api.entity.LaboratoryTechnician;

public interface ILaboratoryTechnicianServices {
    LaboratoryTechnician getLaboratoryTechnicianByToken(String token);
}
