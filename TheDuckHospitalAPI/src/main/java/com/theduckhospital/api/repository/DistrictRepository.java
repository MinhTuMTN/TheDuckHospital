package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistrictRepository extends JpaRepository<District, Integer> {
    List<District> findDistrictsByDeletedIsFalseAndProvince_ProvinceIdOrderByDistrictNameAsc(int provinceId);
}
