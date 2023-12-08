package com.theduckhospital.api.dto.request;

import com.theduckhospital.api.constant.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class CreatePatientProfileRequest {
    @NotBlank(message = "Full name is required")
    private String fullName;
    @NotBlank(message = "Phone number is required")
    private String phoneNumber;
    @NotNull(message = "Date of birth is required")
    private Date dateOfBirth;
    @NotNull(message = "Date of birth is required")
    private Integer gender;
    @NotNull(message = "Date of birth is required")
    private Integer wardId;
    @NotBlank(message = "Street name is required")
    private String streetName;

    private String email;
    private String identityNumber;
    private Integer nationId;
}
