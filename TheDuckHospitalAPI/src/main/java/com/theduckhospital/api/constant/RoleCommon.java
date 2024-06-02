package com.theduckhospital.api.constant;

import com.theduckhospital.api.entity.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class RoleCommon {
    public static Class<? extends Staff> getClassByRole(Role role) {
        switch (role) {
            case DOCTOR -> {
                return Doctor.class;
            }
            case NURSE -> {
                return Nurse.class;
            }
            case CASHIER -> {
                return Cashier.class;
            }
            case PHARMACIST -> {
                return Pharmacist.class;
            }
            case LABORATORY_TECHNICIAN -> {
                return LaboratoryTechnician.class;
            }
            case SUPPORT_AGENT -> {
                return SupportAgent.class;
            }
            case  ADMIN -> {
                return Admin.class;
            }
            default -> {
                return Staff.class;
            }
        }
    }

    public static List<Class<? extends Staff>> getClassesByRoles(List<Role> roles) {
        if (roles == null || roles.isEmpty()) {
            return List.of(Doctor.class, Nurse.class, Cashier.class, Pharmacist.class, LaboratoryTechnician.class, SupportAgent.class);
        }

        return roles.stream()
                .filter(role -> role != Role.PATIENT)
                .map(RoleCommon::getClassByRole)
                .collect(Collectors.toList());
    }

    public static List<String> getStringClassesByRoles(List<Role> roles) {
        if (roles == null || roles.isEmpty()) {
            return List.of("Doctor", "Nurse", "Cashier", "Pharmacist", "LaboratoryTechnician", "SupportAgent");
        }

        return roles.stream()
                .filter(role -> role != Role.PATIENT)
                .map(role -> {
                    assert getClassByRole(role) != null;
                    return getClassByRole(role).getSimpleName();
                })
                .collect(Collectors.toList());
    }
}
