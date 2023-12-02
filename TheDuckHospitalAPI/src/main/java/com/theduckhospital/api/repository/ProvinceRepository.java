package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProvinceRepository extends JpaRepository<Province, Integer> {
    List<Province> findProvincesByDeletedIsFalseOrderByProvinceNameAsc();
}
