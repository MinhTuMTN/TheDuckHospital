package com.theduckhospital.api;

import com.theduckhospital.api.entity.User;
import com.theduckhospital.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class TheDuckHospitalApiApplication implements CommandLineRunner {
	@Autowired
	UserRepository userRepository;
	@Autowired
	PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(TheDuckHospitalApiApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		User user = new User();
		user.setEmail("minhtu@a.com");
		user.setPassword(passwordEncoder.encode("password"));
		user.setPhoneNumber("0123456789");
		userRepository.save(user);
	}
}
