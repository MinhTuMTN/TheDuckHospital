package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Nation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NationRepository extends JpaRepository<Nation, Integer> {
}
