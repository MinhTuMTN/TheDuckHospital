package com.theduckhospital.api.security;

import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final AccountRepository accountRepository;
    @Value("${security.secret.hash}")
    private String secretHashPassword;

    public  CustomUserDetailsService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account;
        if (username.contains("@")) {
            account = accountRepository.findUserByEmail(username);
        } else {
            account = accountRepository.findUserByPhoneNumber(username);
        }

        if (account == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return new CustomUserDetails(account, secretHashPassword);
    }

    public UserDetails loadUserById(String userId) throws UsernameNotFoundException {
        Account account = accountRepository.findById(UUID.fromString(userId)).orElse(null);

        if (account == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return new CustomUserDetails(account, secretHashPassword);
    }
}
