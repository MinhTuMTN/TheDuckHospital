package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Medicine;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicineRepository extends JpaRepository<Medicine, Integer> {
    Page<Medicine> findPaginationByOrderByMedicineNameAscDeletedAsc(Pageable pageable);
    List<Medicine> findByMedicineNameContaining(String medicineName);
}
