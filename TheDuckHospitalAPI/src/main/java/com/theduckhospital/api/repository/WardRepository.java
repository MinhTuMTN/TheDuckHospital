package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WardRepository extends JpaRepository<Ward, Integer> {
    List<Ward> findWardsByDeletedIsFalseAndDistrict_DistrictIdOrderByWardNameAsc(int districtId);
}
