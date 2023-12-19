package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.LaboratoryTechnician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface LaboratoryTechnicianRepository extends JpaRepository<LaboratoryTechnician, UUID> {
}
