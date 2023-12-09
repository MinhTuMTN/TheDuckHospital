package com.theduckhospital.api.dto.request.admin;

import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.constant.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class CreateStaffRequest {
    @NotNull(message = "Role is required")
    private Role role;
    @NotBlank(message = "Full name is required")
    private String fullName;
    @NotBlank(message = "Phone Number is required")
    private String phoneNumber;
    @NotBlank(message = "Identity Number is required")
    private String identityNumber;
    @NotNull(message = "Date of birth is required")
    private Date dateOfBirth;
    @NotNull(message = "Gender is required")
    private Integer gender;
    @NotBlank(message = "Email is required")
    private String email;

    private Degree degree;
    private Integer departmentId;
}
