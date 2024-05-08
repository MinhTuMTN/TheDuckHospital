package com.theduckhospital.api.dto.request.admin;

import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.constant.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class UpdateStaffRequest {
    @NotNull(message = "Role is required")
    private Role role;
    @NotBlank(message = "Full name is required")
    private String fullName;
    @NotBlank(message = "Phone Number is required")
    private String phoneNumber;
    @NotBlank(message = "Identity Number is required")
    private String identityNumber;
    @NotNull(message = "Date of birth is required")
    private String dateOfBirth;
    @NotNull(message = "Gender is required")
    private Integer gender;
    @NotNull(message = "Avatar is required")
    private MultipartFile avatar;

    private Degree degree;
    private Integer departmentId;
}
