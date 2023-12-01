package com.theduckhospital.api;

import com.theduckhospital.api.constant.Role;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class TheDuckHospitalApiApplication implements CommandLineRunner {
	@Autowired
	AccountRepository accountRepository;
	@Autowired
	PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(TheDuckHospitalApiApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Account account = new Account();
		account.setEmail("minhtu@a.com");
		account.setPassword(passwordEncoder.encode("password"));
		account.setPhoneNumber("0123456789");
		account.setRole(Role.ADMIN);
		accountRepository.save(account);
	}
}
