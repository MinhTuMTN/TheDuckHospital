package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.Cashier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CashierRepository extends JpaRepository<Cashier, UUID> {
}
