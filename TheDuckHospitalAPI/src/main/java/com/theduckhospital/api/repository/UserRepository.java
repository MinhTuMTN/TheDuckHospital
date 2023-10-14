package com.theduckhospital.api.repository;

import com.theduckhospital.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    User findUserByEmailAndPassword(String email, String password);
    User findUserByEmail(String email);
    User findUserByPhoneNumberAndPassword(String phoneNumber, String password);
    User findUserByPhoneNumber(String phoneNumber);
}
