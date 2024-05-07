package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Staff;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface StaffRepository extends JpaRepository<Staff, UUID> {
    Page<Staff> findPaginationByOrderByDeleted(Pageable pageable);
    List<Staff> findByFullNameContainingAndDeletedIn(String fullName, List<Boolean> deleted);

    @Query(value = "SELECT * FROM staff WHERE FREETEXT(fullName, :fullName) AND deleted IN :deleted", nativeQuery = true)
    List<Staff> findFullTextSearchByFullNameAndDeletedIn(
            @Param("fullName") String fullName,
            @Param("deleted") List<Boolean> deleted);
}
