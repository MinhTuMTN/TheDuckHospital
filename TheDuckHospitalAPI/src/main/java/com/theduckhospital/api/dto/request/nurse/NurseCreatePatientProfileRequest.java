package com.theduckhospital.api.dto.request.nurse;

import com.theduckhospital.api.constant.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class NurseCreatePatientProfileRequest {
    @NotBlank(message = "fullName is required")
    private String fullName;
    @NotNull(message = "dateOfBirth is required")
    private Date dateOfBirth;
    @NotBlank(message = "phoneNumber is required")
    private String phoneNumber;
    private String identityNumber;
    @NotNull(message = "nationId is required")
    private Integer nationId;
    @NotNull(message = "gender is required")
    private Gender gender;
    @NotBlank(message = "streetName is required")
    private String streetName;
    @NotNull(message = "wardId is required")
    private Integer wardId;
}
