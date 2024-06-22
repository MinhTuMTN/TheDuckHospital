package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RatingRepository extends JpaRepository<Rating, UUID> {
    List<Rating> findByDoctorAndDeletedIsFalse(Doctor doctor);
}
