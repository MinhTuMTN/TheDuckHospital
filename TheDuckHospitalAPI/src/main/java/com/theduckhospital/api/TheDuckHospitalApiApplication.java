package com.theduckhospital.api;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.theduckhospital.api.constant.Role;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Admin;
import com.theduckhospital.api.entity.Staff;
import com.theduckhospital.api.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.IOException;
import java.util.Date;

@SpringBootApplication
public class TheDuckHospitalApiApplication implements CommandLineRunner {
	@Bean
	FirebaseMessaging firebaseMessaging() throws IOException {
		GoogleCredentials credentials = GoogleCredentials
				.fromStream(new ClassPathResource("key.json").getInputStream());

		FirebaseOptions firebaseOptions = FirebaseOptions
				.builder()
				.setCredentials(credentials)
				.build();

		FirebaseApp firebaseApp;
		if (FirebaseApp.getApps().isEmpty()) {
			firebaseApp = FirebaseApp.initializeApp(firebaseOptions);
		} else {
			firebaseApp = FirebaseApp.getInstance();
		}
		return FirebaseMessaging.getInstance(firebaseApp);
	}

	public static void main(String[] args) {
		SpringApplication.run(TheDuckHospitalApiApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		return;
	}
}
