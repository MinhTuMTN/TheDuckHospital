package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.MedicalService;
import com.theduckhospital.api.entity.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalServiceRepository extends JpaRepository<MedicalService, Integer> {
    Page<MedicalService> findPaginationByOrderByDeleted(Pageable pageable);
}
