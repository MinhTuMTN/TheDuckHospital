package com.theduckhospital.api.security;

import com.theduckhospital.api.entity.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {
    private Account account;
    private String secretHashPassword;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String role;

        if (account.getStaff() != null) {
            Staff staff = account.getStaff();

            if (staff instanceof Admin)
                role = "ADMIN";
            else if (staff instanceof Doctor) {
                if (((Doctor) staff).isHeadOfDepartment())
                    role = "HEAD_DOCTOR";
                else
                    role = "DOCTOR";
            } else if (staff instanceof Cashier)
                role = "CASHIER";
            else if (staff instanceof Nurse) {
                if (((Nurse) staff).isHeadOfDepartment())
                    role = "HEAD_NURSE";
                else
                    role = "NURSE";
            } else if (staff instanceof LaboratoryTechnician)
                role = "LABORATORY_TECHNICIAN";
            else if (staff instanceof SupportAgent)
                role = "SUPPORT_AGENT";
            else
                role = "USER";
        } else
            role = "USER";

        return List.of((GrantedAuthority) () -> "ROLE_" + role);
    }

    @Override
    public String getPassword() {
        return secretHashPassword;
    }

    @Override
    public String getUsername() {
        return account.getUserId().toString();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return !account.isDeleted();
    }
}
